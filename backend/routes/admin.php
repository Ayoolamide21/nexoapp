<?php

use App\Http\Controllers\Admin\SomeController;
use App\Models\Settings;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\DepositController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\WithdrawalController;

Route::prefix('admin')->name('admin.')->middleware('web')->group(function () {

    Route::get('/bypass', [AdminAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/bypass', [AdminAuthController::class, 'login']);

    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

        //Admin User Route
        Route::get('users', [AdminController::class, 'userList'])->name('userlist');
        Route::post('add-user', [AdminController::class, 'addUser'])->name('adduser');
        Route::put('users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('users/{id}', [AdminController::class, 'deleteUser'])->name('user.delete');

        //Admin Plans Route
        Route::get('plans', [PlanController::class, 'planList'])->name('plans.list');
        Route::post('plans', [PlanController::class, 'addPlan'])->name('plans.add');
        Route::put('plans/{plan}', [PlanController::class, 'updatePlan'])->name('plans.update');
        Route::delete('plans/{plan}', [PlanController::class, 'deletePlan'])->name('plans.delete');

        Route::get('active/plans', [PlanController::class, 'userActivePlans'])->name('plans.user_active');
        Route::put('active/plans/{id}', [PlanController::class, 'updateUserPlan'])->name('plans.user_active.update');
        Route::delete('active/plans/{id}', [PlanController::class, 'deleteUserPlan'])->name('plans.user_active.delete');


        //Admin Deposit Route
        Route::get('deposits/pending', [DepositController::class, 'pendingDeposits'])->name('deposits.pending');
        Route::get('deposits/history', [DepositController::class, 'history'])->name('deposits.history');
        Route::delete('deposits/{id}', [DepositController::class, 'destroy'])->name('deposits.destroy');
        Route::post('deposits/{id}/approve', [DepositController::class, 'approveDeposit'])->name('deposits.approve');
        Route::post('deposits/{id}/reject', [DepositController::class, 'rejectDeposit'])->name('deposits.reject');

        // Admin Withdrawal Routes
        Route::get('withdrawals/pending', [WithdrawalController::class, 'pendingWithdrawals'])->name('withdrawals.pending');
        Route::get('withdrawals/history', [WithdrawalController::class, 'history'])->name('withdrawals.history');
        Route::delete('withdrawals/{id}', [WithdrawalController::class, 'destroy'])->name('withdrawals.destroy');
        Route::post('withdrawals/{id}/approve', [WithdrawalController::class, 'approveWithdrawal'])->name('withdrawals.approve');
        Route::post('withdrawals/{id}/reject', [WithdrawalController::class, 'rejectWithdrawal'])->name('withdrawals.reject');

        // Admin Settings Routes
        Route::get('settings/company', [SettingsController::class, 'companySettings'])->name('settings.company');
        Route::post('settings/update', [SettingsController::class, 'updateSettings'])->name('settings.update');
        Route::get('settings/email', [SettingsController::class, 'emailSettings'])->name('settings.email');
        Route::post('settings/email/update', [SettingsController::class, 'updateEmailSettings'])->name('settings.email.update');

        Route::get('settings/gateways', [SettingsController::class, 'gatewaySettings'])->name('gateway.settings');
        Route::get('settings/gateways/{gateway}/edit', [SettingsController::class, 'editGateway'])->name('payment_gateways.edit');
        Route::put('settings/gateways/{gateway}', [SettingsController::class, 'updateGateway'])->name('payment_gateways.update');

        Route::get('languages', [SettingsController::class, 'languageIndex'])->name('language.settings');
        Route::post('languages', [SettingsController::class, 'storeLanguage'])->name('language.store');
        Route::put('languages/{language}', [SettingsController::class, 'updateLanguage'])->name('language.update');
        Route::delete('languages/{language}', [SettingsController::class, 'deleteLanguage'])->name('language.delete');

        Route::get('currencies', [SettingsController::class, 'currencyIndex'])->name('currency.settings');
        Route::post('currencies', [SettingsController::class, 'storeCurrency'])->name('currency.store');
        Route::put('currencies/{currency}', [SettingsController::class, 'updateCurrency'])->name('currency.update');
        Route::delete('currencies/{currency}', [SettingsController::class, 'deleteCurrency'])->name('currency.delete');

        //Admin Faq Routes
        Route::get('/faqs', [SomeController::class, 'index'])->name('faq.index');
        Route::post('/faqs', [SomeController::class, 'store'])->name('faq.store');
        Route::put('/faqs/{faq}', [SomeController::class, 'update'])->name('faq.update');
        Route::delete('/faqs/{faq}', [SomeController::class, 'destroy'])->name('faq.delete');

        // Admin Help Articles Routes
        Route::get('/help-articles', [SomeController::class, 'helpIndex'])->name('help.index');
        Route::get('/help-articles/create', [SomeController::class, 'helpCreate'])->name('help.create');
        Route::post('/help-articles', [SomeController::class, 'helpStore'])->name('help.store');
        Route::get('/help-articles/{article}/edit', [SomeController::class, 'helpEdit'])->name('help.edit');
        Route::put('/help-articles/{article}', [SomeController::class, 'helpUpdate'])->name('help.update');
        Route::delete('/help-articles/{article}', [SomeController::class, 'helpDestroy'])->name('help.delete');

        //Admin Support Email
        Route::get('support', [SomeController::class, 'supportIndex'])->name('support.index');
        Route::post('support/reply/{id}', [SomeController::class, 'supportReply'])->name('support.reply');
    });
});
