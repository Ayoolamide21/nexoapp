<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\LoanApplication;
use App\Models\Plan;
use App\Models\User;
use App\Models\Transaction;

class LoanController extends Controller
{
    public function applyForLoan(Request $request)
    {
        $user = User::findOrFail(Auth::id());

        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'amount_requested' => 'required|numeric|min:0',
            'term' => 'required|integer|min:1',
        ]);

        // Ensure the plan exists AND is a loan
        $plan = Plan::where('id', $validated['plan_id'])
            ->where('category', 'loans')
            ->firstOrFail();
        // Define start and end dates
        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addDays((int) $plan->duration);

        // Create the loan application
        $application = LoanApplication::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'amount_requested' => $validated['amount_requested'],
            'term' => $validated['term'],
            'interest_rate' => $plan->profit_rate,
            'status' => 'pending',
        ]);

        // Create a transaction record (fixing variables and linking properly)
        // Assuming you want to create a deposit transaction for the loan amount
        Transaction::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'amount' => $validated['amount_requested'],
            'starts_at' => $startDate,
            'ends_at' => $endDate,
            'type' => 'loan_request',
            'status' => 'completed',
            'reference' => 'loan_application_' . $application->id,
        ]);

        return response()->json([
            'message' => 'Loan application submitted.',
            'application' => $application,
        ]);
    }


    // public function getLoanPlans()
    // {
    //     $loanPlans = Plan::where('category', 'loan')
    //         ->where('status', 'active')
    //         ->select('id', 'name', 'min_amount', 'max_amount', 'profit_rate', 'profit_interval', 'duration', 'description')
    //         ->get();

    //     return response()->json([
    //         'plans' => $loanPlans,
    //     ]);
    // }

    public function getUserLoanApplications(Request $request)
    {
        // Ensure the user is authenticated
        $user = Auth::user();  // Get the authenticated user

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Fetch loan applications for the authenticated user
        $loanApplications = LoanApplication::where('user_id', $user->id)
            ->get(['id', 'plan_id', 'amount_requested', 'term', 'interest_rate', 'status', 'decision_date', 'created_at', 'updated_at']);

        // Check if the user has no loan applications
        if ($loanApplications->isEmpty()) {
            return response()->json(['message' => 'No loan applications found for this user'], 404);
        }

        // Return the loan applications
        return response()->json($loanApplications);
    }
}
