<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\HelpController;



// routes/api.php
Route::middleware('throttle:5,1')->group(function () {
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
  Route::post('/password/reset', [AuthController::class, 'resetPassword']);

  Route::post('/verify-2fa-login', [AuthController::class, 'verify2FALogin']);
  Route::post('/verify-otp', [AuthController::class, 'verifyEmailOtp']);
  Route::post('/resend-otp', [AuthController::class, 'resendVerificationOtp']);
});

Route::get('/front', [FrontController::class, 'index']);
Route::get('/front-plan', [FrontController::class, 'planFront']);


Route::get('/help/articles', [HelpController::class, 'articles']);
Route::get('/help/faqs', [HelpController::class, 'faqs']);
Route::post('/help/submit', [HelpController::class, 'submit']);
Route::get('/help/articles/{slug}', [HelpController::class, 'articleBySlug']);




Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::get('/plans', [PlanController::class, 'index']);
  Route::post('/plans', [PlanController::class, 'store']);
  Route::post('/convert-points', [DepositController::class, 'convertPointsToBalance']);
  Route::get('/pp', [PlanController::class, 'userPurchasedPlans']);
  Route::post('/pp/{id}/lock', [PlanController::class, 'lockPlan']);

  Route::post('/deposit', [DepositController::class, 'createDeposit']);
  Route::get('/deposits/total', [DepositController::class, 'getTotalDeposits']);
  Route::get('/payment-gateways', [DepositController::class, 'getPaymentGateway']);

  Route::post('/nowpayments/ipn', [DepositController::class, 'nowPaymentsIPN'])->name('nowpayments.ipn');
  Route::post('/coinpayments/ipn', [DepositController::class, 'coinpaymentsIPN'])->name('coinpayments.ipn');

  Route::prefix('withdrawal')->group(function(){
    Route::post('/', [WithdrawalController::class, 'makeWithdrawal']);
    Route::get('/history', [WithdrawalController::class, 'getHistory']);
    
    // Admin routes:
    Route::post('/withdrawals/{id}/approve', [WithdrawalController::class, 'approveWithdrawal'])->middleware('can:approve-withdrawals');
    Route::post('/withdrawals/{id}/reject', [WithdrawalController::class, 'rejectWithdrawal'])->middleware('can:approve-withdrawals');
});
  



  Route::get('/activity', [DepositController::class, 'activity']);
  Route::post('/loans/apply', [LoanController::class, 'applyForLoan']);
  Route::get('/loan-applications', [LoanController::class, 'getUserLoanApplications']);

  //Route::get('/loan-plans', [LoanController::class, 'getLoanPlans']);

  Route::patch('/profile/update', [UserController::class, 'updateProfile']);
  Route::get('/referrals', [UserController::class, 'referralInfo']);
  Route::post('/change-password', [UserController::class, 'changePassword']);

  //Goals
Route::prefix('ai')->group(function () {
    Route::post('/ask', [AIController::class, 'handleQuestion']);
    Route::post('/preview-plans', [AIController::class, 'previewPlans']);
    Route::post('/save-goal', [AIController::class, 'saveGoal']);
    Route::post('/recommend', [AIController::class, 'recommendPlansForGoal']);
  });


Route::prefix('goals')->group(function () {
  Route::get('/{id}', [GoalController::class, 'show']);
  Route::put('/{id}', [GoalController::class, 'update']);
  Route::get('/', [GoalController::class, 'userGoals']);
  Route::post('/calculate-plan-impact', [GoalController::class, 'calculatePlanImpact']);
  Route::post('/assign', [GoalController::class, 'assignTransactionsToGoal']);
    Route::post('/', [GoalController::class, 'store']);

  Route::delete('/{id}', [GoalController::class, 'destroy']);
});


  //2FA
  Route::post('enable-2fa', [UserController::class, 'enable2FA']);
  Route::post('verify-2fa', [UserController::class, 'verify2FA']);
  Route::post('/disable-2fa', [UserController::class, 'disable2FA']);


  Route::post('/invest', [PlanController::class, 'invest']);
  

  Route::post('/logout', [AuthController::class, 'logout']);
  
  Route::get('/me', [AuthController::class, 'me']);
});
