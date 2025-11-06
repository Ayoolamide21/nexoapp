<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class WithdrawalController extends Controller
{
    /**
     * Make a new withdrawal request
     */
    public function makeWithdrawal(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1',
            'destination' => 'required|string|max:255',
            'withdrawal_method' => 'required|string|in:bank_transfer,crypto',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->balance < $request->amount) {
            return response()->json([
                'message' => 'Insufficient balance.'
            ], 400);
        }

        $user->balance -= $request->amount;
        $user->save();

        /** @var Withdrawal $withdrawal */
        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'destination' => $request->destination,
            'withdrawal_method' => $request->withdrawal_method,
            'status' => Withdrawal::STATUS_PENDING,
            'reference' => Str::uuid()->toString(),
        ]);
        // Create linked transaction as pending
        Transaction::create([
            'user_id' => $user->id,
            'withdrawal_id' => $withdrawal->id,
            'amount' => $withdrawal->amount,
            'type' => 'withdrawal',
            'status' => 'pending',
            'reference' => $withdrawal->reference,
        ]);
        return response()->json([
            'message' => 'Withdrawal request submitted.',
            'withdrawal' => $withdrawal,
        ], 201);
    }

    public function getHistory(Request $request)
    {
        $perPage = $request->query('per_page', 10);

        $withdrawals = Withdrawal::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($withdrawals);
    }


}
