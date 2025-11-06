<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\LoyaltyPoint;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepositController extends Controller
{
    /**
     * Handle user-initiated deposit (already correct)
     */
    public function deposit(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = User::findOrFail(Auth::id());
        $amount = $request->amount;

        // 1. Create a pending deposit (let admin approve)
        $deposit = Deposit::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'status' => 'pending',
            'payment_method' => 'bank_transfer',
        ]);

        return response()->json([
            'message' => 'Deposit request submitted and awaiting admin approval.',
        ]);
    }

    /**
     * Admin — View pending deposits
     */
    public function pendingDeposits(Request $request)
    {
        $query = Deposit::with('user')->where('status', 'pending');

        // Optional: search by user name or amount
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhere('amount', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);
        $data['deposits'] = $query->orderByDesc('created_at')->paginate($perPage)->withQueryString();
        $data['page_title'] = 'Pending Deposit Request';

        return view('admin.deposit.pdeposit', compact('data'));
    }

    /**
     * Admin — Approve deposit
     */
    public function approveDeposit($id)
    {
        $deposit = Deposit::with('user')->findOrFail($id);

        if ($deposit->status !== 'pending') {
            return back()->with('error', 'This deposit has already been processed.');
        }

        //1. Update deposit status
        $deposit->status = 'successful';
        $deposit->save();

        $user = $deposit->user;
        $user->balance += $deposit->amount;
        $user->save();

        //Update corresponding transaction (if it exists) or create new one
        $transaction = Transaction::where('deposit_id', $deposit->id)->first();
        if ($transaction) {
            // Update existing pending transaction to completed
            $transaction->status = 'completed';
            $transaction->save();
        }

        //Award loyalty points
        $pointsEarned = floor($deposit->amount);
        $user->loyalty_points += $pointsEarned;
        $user->save();

        LoyaltyPoint::create([
            'user_id' => $user->id,
            'points' => $pointsEarned,
            'source' => 'deposit',
            'reference' => $deposit->reference,
        ]);

        sendTransactionMail(
            $user,
            $transaction,
            'deposit',
            'Deposit Approved',
            'Your deposit of $' . $deposit->amount . ' has been approved.'
        );


        return back()->with('success', 'Deposit approved successfully. User balance and loyalty points updated.');
    }


    /**
     * Admin — Reject deposit
     */
    public function rejectDeposit($id)
    {
        $deposit = Deposit::with('user')->findOrFail($id);

        if ($deposit->status !== 'pending') {
            return back()->with('error', 'This deposit has already been processed.');
        }

        $deposit->status = 'failed';
        $deposit->save();

        // Update the linked transaction
        $transaction = Transaction::where('deposit_id', $deposit->id)->first();
        if ($transaction) {
            $transaction->status = 'cancelled';
            $transaction->save();
        }

        // Fetch user
        $user = $deposit->user;
        if ($user) {
            sendTransactionMail(
                $user,
                $transaction,
                'deposit',
                'Deposit Rejected',
                'Your deposit of $' . $deposit->amount . ' has been rejected.'
            );
            sendTransactionMail($user, $transaction, 'deposit', 'Deposit Rejected', 'Your deposit has been rejected');
        }

        return back()->with('success', 'Deposit rejected successfully.');
    }

    /**
     * Confirm user bank transfer (API endpoint)
     */
    public function confirmBankTransfer($depositId)
    {
        $deposit = Deposit::findOrFail($depositId);

        if ($deposit->payment_method !== 'bank_transfer') {
            return response()->json(['error' => 'Not a bank transfer deposit.'], 400);
        }

        if ($deposit->status !== 'pending') {
            return response()->json(['error' => 'Deposit already processed.'], 400);
        }

        // Mark deposit as successful
        $deposit->status = 'successful';
        $deposit->save();

        // Add amount to user balance
        $user = $deposit->user;
        $user->balance += $deposit->amount;
        $user->save();

        // Log a transaction as successful deposit
        Transaction::create([
            'user_id' => $user->id,
            'amount' => $deposit->amount,
            'type' => 'deposit',
            'status' => 'completed',
            'reference' => $deposit->reference,
        ]);

        return response()->json(['message' => 'Bank transfer confirmed and balance updated.']);
    }

    public function history(Request $request)
    {
        $query = Deposit::with('user')->orderBy('created_at', 'desc');

        // Optional search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhere('amount', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);
        $data['deposits'] = $query->paginate($perPage)->withQueryString();
        $data['page_title'] = 'Deposit History';

        return view('admin.deposit.history', compact('data'));
    }
    public function destroy($id)
    {
        $deposit = Deposit::findOrFail($id);

        // Delete all transactions linked to this deposit (if any)
        $deposit->transactions()->delete();

        // Then delete the deposit itself
        $deposit->delete();

        return redirect()->back()->with('success', 'Deposit and related transactions deleted successfully.');
    }
}