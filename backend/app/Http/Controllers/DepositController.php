<?php

namespace App\Http\Controllers;

use App\Models\LoyaltyPoint;
use App\Models\PaymentGateway;
use App\Models\User;
use App\Models\Deposit;
use App\Models\Transaction;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;


class DepositController extends Controller
{
    public function getPaymentGateway()
    {
        $gateways = PaymentGateway::where('status', 1)
            ->where('environment', 'production')
            ->get(['id', 'name', 'public_key', 'currency']);

        if ($gateways->isEmpty()) {
            return response()->json(['message' => 'No payment gateways available'], 404);
        }

        return response()->json([
            'message' => 'Available payment gateways fetched successfully',
            'gateways' => $gateways
        ]);
    }

    private function createNowPaymentsInvoice($amount, $currency, $reference, $gateway)
    {
        $apiKey = $gateway->public_key;
        $priceCurrency = $gateway->currency;

        $client = new \GuzzleHttp\Client();

        try {
            $response = $client->post('https://api.nowpayments.io/v1/invoice', [
                'headers' => [
                    'x-api-key' => $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'price_amount' => $amount,
                    'price_currency' => strtoupper($priceCurrency),
                    'pay_currency' => strtoupper($currency),
                    'order_id' => $reference,
                    'order_description' => 'Deposit to Astro App',
                    'ipn_callback_url' => route('nowpayments.ipn'),
                    'success_url' => url('/payment/success'),
                    'cancel_url' => url('/payment/cancel'),
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            return $body;
        } catch (\Exception $e) {

            return null;
        }
    }

    private function createCoinPaymentsTransaction($amount, $currency, $reference, $gateway)
    {
        $publicKey = $gateway->public_key;
        $privateKey = $gateway->secret_key;

        $req = [
            'version' => 1,
            'cmd' => 'create_transaction',
            'key' => $publicKey,
            'amount' => $amount,
            'currency1' => 'USD',
            'currency2' => strtoupper($currency),
            'custom' => $reference,
            'invoice' => $reference,
            'ipn_url' => route('coinpayments.ipn'),
            'success_url' => url('/payment/success'),
            'cancel_url' => url('/payment/cancel'),
            'format' => 'json',
        ];

        $postData = http_build_query($req, '', '&');
        $hmac = hash_hmac('sha512', $postData, $privateKey);

        $client = new \GuzzleHttp\Client();

        try {
            $response = $client->post('https://www.coinpayments.net/api.php', [
                'headers' => [
                    'HMAC' => $hmac,
                ],
                'form_params' => $req,
            ]);

            $body = json_decode($response->getBody(), true);

            if ($body['error'] === 'ok') {
                return [
                    'payment_url' => $body['result']['checkout_url'],
                    'txn_id' => $body['result']['txn_id'],
                ];
            }

            return null;
        } catch (\Exception $e) {
        
            return null;
        }
    }

    public function createDeposit(Request $request)
    {
        // Validate basic inputs
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'currency' => 'nullable|string',
        ]);

        $user = Auth::user();
        $amount = $request->input('amount');
        $paymentMethod = $request->input('payment_method');

        // Fetch active production gateways from DB
        $gateway = PaymentGateway::where('name', $paymentMethod)
            ->where('status', 1)
            ->where('environment', 'production')
            ->first();

        if (!$gateway) {
            return response()->json(['error' => 'Selected payment method is not available'], 400);
        }

        // Use request currency or gateway default
        $currency = $request->input('currency') ?? $gateway->currency;
        $reference = Str::uuid()->toString();
        $status = 'pending';

        // Create deposit record
        $deposit = Deposit::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'payment_method' => $paymentMethod,
            'currency' => $currency,
            'status' => $status,
            'reference' => $reference,
        ]);

        // Log initial transaction as pending
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'deposit_id' => $deposit->id,
            'type' => 'deposit',
            'status' => 'pending',
        ]);

        sendTransactionMail($user, $transaction, 'deposit');

        $responseData = [
            'message' => 'Deposit initiated',
            'deposit' => $deposit,
        ];
        
        // Handle payment method logic
        switch ($paymentMethod) {
            case 'nowpayment':
                $invoice = $this->createNowPaymentsInvoice($amount, $currency, $reference, $gateway);
                if (isset($invoice['invoice_url'])) {
                    $responseData['payment_url'] = $invoice['invoice_url'];
                } else {
                    $deposit->update(['status' => 'failed']);
                    return response()->json(['error' => 'Failed to create NowPayments invoice'], 500);
                }
                break;

            case 'coinpayment':
                $invoice = $this->createCoinPaymentsTransaction($amount, $currency, $reference, $gateway);
                if (isset($invoice['payment_url'])) {
                    $responseData['payment_url'] = $invoice['payment_url'];
                } else {
                    $deposit->update(['status' => 'failed']);
                    return response()->json(['error' => 'Failed to create CoinPayments invoice'], 500);
                }
                break;

            case 'bank_transfer':
                $responseData['bank_details'] = [
                    'bank_name' => 'Bank of America',
                    'account_number' => '123456789',
                    'routing_number' => '987654321',
                    'reference' => $reference,
                ];
                break;

            default:
                return response()->json(['error' => 'Unsupported payment method.'], 400);
        }

        return response()->json($responseData);
    }

    public function nowPaymentsIPN(Request $request)
    {
        $data = $request->all();

        $reference = $data['order_id'] ?? null;
        $paymentStatus = $data['payment_status'] ?? null;

        if (!$reference) {
            return response()->json(['error' => 'Missing order_id'], 400);
        }

        $deposit = Deposit::where('reference', $reference)->first();

        if (!$deposit) {
            return response()->json(['error' => 'Deposit not found'], 404);
        }

        if ($paymentStatus === 'finished') {
            if ($deposit->status === 'successful' || $deposit->status === 'completed') {
                return response()->json(['message' => 'Deposit already processed']);
            }

            // Mark deposit successful
            $deposit->status = 'successful';
            $deposit->save();

            // Credit user balance
            $user = $deposit->user;
            $user->balance += $deposit->amount;
            $user->save();

            // Create transaction record
            Transaction::create([
                'user_id' => $user->id,
                'amount' => $deposit->amount,
                'type' => 'deposit',
                'status' => 'completed',
                'reference' => $deposit->reference,
            ]);
        }

        return response()->json(['message' => 'NowPayments IPN processed']);
    }

    // For coinpayments, you'll want an IPN listener (webhook) to update deposit status
    public function coinpaymentsIPN(Request $request)
    {
        // Validate IPN with coinpayments keys here...

        $reference = $request->input('invoice');

        $deposit = Deposit::where('reference', $reference)->first();

        if (!$deposit) {
            return response()->json(['error' => 'Deposit not found'], 404);
        }

        // Check payment status from IPN payload, e.g. payment_status = 'completed'
        $paymentStatus = $request->input('payment_status');

        if ($paymentStatus == 'completed' && $deposit->status == 'pending') {
            // Update deposit status
            $deposit->status = 'successful';
            $deposit->save();

            // Add amount to user balance
            $user = $deposit->user;
            $user->balance += $deposit->amount;
            $user->save();

            // Log transaction
            Transaction::create([
                'user_id' => $user->id,
                'amount' => $deposit->amount,
                'type' => 'deposit',
                'status' => 'completed',
                'reference' => $deposit->reference,
            ]);
        }

        return response()->json(['message' => 'IPN processed']);
    }
    
    public function convertPointsToBalance(Request $request)
    {
        $user = User::findOrFail(Auth::id());

        $conversionRate = 0.0004;
        $minPointsToConvert = 10;

        if ($user->loyalty_points < $minPointsToConvert) {
            return response()->json(['message' => 'You need at least 10 points to convert.'], 422);
        }

        // Convert all points to balance
        $pointsToConvert = $user->loyalty_points;
        $amountToAdd = round($pointsToConvert * $conversionRate, 2); // Round to 2 decimal places

        $user->balance += $amountToAdd;
        $user->loyalty_points = 0;
        $user->save();

        // Log the negative points
        LoyaltyPoint::create([
            'user_id' => $user->id,
            'points' => -$pointsToConvert,
            'source' => 'conversion',
            'reference' => null,
        ]);
        // Log transaction for the conversion adding balance
        Transaction::create([
            'user_id' => $user->id,
            'amount' => $amountToAdd,
            'type' => 'points_conversion',
            'status' => 'completed',
            'reference' => null,
        ]);

        return response()->json([
            'message' => "Converted {$pointsToConvert} points to \${$amountToAdd} successfully.",
            'new_balance' => $user->balance,
            'loyalty_points' => $user->loyalty_points,
        ]);
    }
    public function activity(Request $request)
    {
        $user = $request->user();

        $filterType = $request->input('type');
        $startDate = $request->input('start_date') ? Carbon::parse($request->input('start_date')) : null;
        $endDate = $request->input('end_date') ? Carbon::parse($request->input('end_date')) : null;
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $query = $user->transactions()->when($filterType, function ($q) use ($filterType) {
            return $q->where('type', $filterType);
        });

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        $paginated = $query->orderByDesc('created_at')->paginate($perPage, ['*'], 'page', $page);

        $activities = $paginated->getCollection()->map(function ($transaction) {
            return [
                'type' => $transaction->type,
                'amount' => $transaction->amount,
                'earning' => $transaction->earning,
                'points_conversion' => $transaction->points_conversion,
                'status' => $transaction->status ?? null,
                'date' => $transaction->created_at,
            ];
        });

        return response()->json([
            'data' => $activities,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'total_pages' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }
    public function getTotalDeposits(Request $request)
    {
        $user = $request->user();

        $totalDeposits = Deposit::where('user_id', $user->id)
            ->where('status', 'successful')
            ->sum('amount');

        return response()->json(['total_deposits' => $totalDeposits]);
    }
}
