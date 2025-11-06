<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Withdrawal;
use Illuminate\Http\Request;


class WithdrawalController extends Controller
{
    public function pendingWithdrawals(Request $request)
    {
        $query = Withdrawal::with('user')->where('status', 'pending');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhere('amount', 'like', "%{$search}%");
        }

        $perPage = (int) $request->input('per_page', 10);
        $data['withdrawals'] = $query->orderByDesc('created_at')->paginate($perPage)->withQueryString();
        $data['page_title'] = 'Pending Withdrawal Requests';

        return view('admin.withdrawal.pwithdrawal', compact('data'));
    }

    public function approveWithdrawal($id)
    {
        $withdrawal = Withdrawal::with('user')->findOrFail($id);

        if ($withdrawal->status !== 'pending') {
            return back()->with('error', 'This withdrawal has already been processed.');
        }

        //Mark withdrawal as completed
        $withdrawal->status = 'completed';
        $withdrawal->save();

        //Load user
        $user = $withdrawal->user;

        //Update related transaction
        $transaction = Transaction::where('withdrawal_id', $withdrawal->id)->first();
        if ($transaction) {
            $transaction->status = 'completed';
            $transaction->save();

            //Send approval mail
            sendTransactionMail($user, $transaction, 'withdrawal', 'Withdrawal Approved', 'Your withdrawal has been approved');
        }

        return back()->with('success', 'Withdrawal approved successfully and user balance updated.');
    }

    public function rejectWithdrawal($id)
    {
        $withdrawal = Withdrawal::with('user')->findOrFail($id);

        if ($withdrawal->status !== 'pending') {
            return back()->with('error', 'This withdrawal has already been processed.');
        }

        // Refund user balance
        $user = $withdrawal->user;
        $user->balance += $withdrawal->amount;
        $user->save();

        // Update withdrawal status
        $withdrawal->status = 'rejected';
        $withdrawal->save();

        // Update linked transaction
        $transaction = Transaction::where('withdrawal_id', $withdrawal->id)->first();
        if ($transaction) {
            $transaction->status = 'cancelled';
            $transaction->save();

            // Send rejection mail
            sendTransactionMail($user, $transaction, 'withdrawal', 'Withdrawal Rejected', 'Your withdrawal request was rejected');
        }

        return back()->with('success', 'Withdrawal request rejected and user balance refunded.');
    }

    public function history(Request $request)
    {
        $query = Withdrawal::with('user')->orderBy('created_at', 'desc');

        if ($search = $request->input('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })
                ->orWhere('amount', 'like', "%{$search}%");
        }

        $withdrawals = $query->paginate(10)->withQueryString();

        $data = [
            'withdrawals' => $withdrawals,
            'page_title' => 'Withdrawal History',
        ];

        return view('admin.withdrawal.history', compact('data'));
    }

    // Delete a withdrawal
    public function destroy($id)
    {
        $withdrawal = Withdrawal::findOrFail($id);
        $withdrawal->delete();

        return redirect()->back()->with('success', 'Withdrawal deleted successfully.');
    }
}
