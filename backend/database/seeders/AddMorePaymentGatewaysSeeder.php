<?php

namespace Database\Seeders;

use App\Models\PaymentGateway;
use Illuminate\Database\Seeder;

class AddMorePaymentGatewaysSeeder extends Seeder
{
    public function run()
    {
        // Add new payment gateways
        PaymentGateway::create([
            'name' => 'NowPayment',
            'public_key' => 'your-public-key-nowpayment',
            'secret_key' => 'your-secret-key-nowpayment',
            'status' => true,
            'environment' => 'production', // Or 'sandbox' if in test mode
            'currency' => 'USD',
            'logo' => 'payment-gateway-nowpayment.png', // You can update with the actual path if needed
        ]);

        PaymentGateway::create([
            'name' => 'CoinPayment',
            'public_key' => 'your-public-key-coinpayment',
            'secret_key' => 'your-secret-key-coinpayment',
            'status' => true,
            'environment' => 'production', // Or 'sandbox' if in test mode
            'currency' => 'BTC', // or any other supported currency
            'logo' => 'payment-gateway-coinpayment.png',
        ]);

        PaymentGateway::create([
            'name' => 'Coinbase',
            'public_key' => 'your-public-key-coinbase',
            'secret_key' => 'your-secret-key-coinbase',
            'status' => true,
            'environment' => 'production',
            'currency' => 'USD',
            'logo' => 'payment-gateway-coinbase.png',
        ]);
    }
}
