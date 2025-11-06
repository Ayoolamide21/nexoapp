<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Settings;

class SettingsTableSeeder extends Seeder
{
    public function run()
    {
        $settings = [
            // === App Info ===
            ['key' => 'app.logo', 'value' => '/uploads/logo.png', 'type' => 'string', 'group' => 'app', 'label' => 'Logo', 'description' => 'Recommended size: max width 200px, max height 100px'],
            ['key' => 'app.favicon', 'value' => '/uploads/favicon.ico', 'type' => 'string', 'group' => 'app', 'label' => 'Favicon', 'description' => 'Recommended size: 32x32'],
            ['key' => 'app.currency', 'value' => 'USD', 'type' => 'string', 'group' => 'app', 'label' => 'Currency'],
            ['key' => 'app.redirect_homepage_url', 'value' => null, 'type' => 'string', 'group' => 'app', 'label' => 'Homepage Redirect URL'],
            ['key' => 'app.announcement', 'value' => 'Welcome to our platform!', 'type' => 'string', 'group' => 'app', 'label' => 'Announcement'],

            // === Trade Settings ===
            ['key' => 'app.weekend_trade', 'value' => 'true', 'type' => 'boolean', 'group' => 'trade', 'label' => 'Weekend Trade'],
            ['key' => 'app.trade_mode', 'value' => 'true', 'type' => 'boolean', 'group' => 'trade', 'label' => 'Trade Mode'],
            ['key' => 'app.return_capital', 'value' => 'true', 'type' => 'boolean', 'group' => 'trade', 'label' => 'Return Capital'],
            ['key' => 'app.plan_cancellation', 'value' => 'true', 'type' => 'boolean', 'group' => 'trade', 'label' => 'Plan Cancellation'],

            // === User Access / Restrictions ===
            ['key' => 'app.withdrawals_enabled', 'value' => 'true', 'type' => 'boolean', 'group' => 'user', 'label' => 'Withdrawals Enabled'],
            ['key' => 'app.kyc_required', 'value' => 'false', 'type' => 'boolean', 'group' => 'user', 'label' => 'KYC Required'],
            ['key' => 'app.kyc_on_registration', 'value' => 'false', 'type' => 'boolean', 'group' => 'user', 'label' => 'KYC on Registration'],

            // === Auth / Security ===
            ['key' => 'app.google_login_enabled', 'value' => 'true', 'type' => 'boolean', 'group' => 'auth', 'label' => 'Google Login'],
            ['key' => 'app.email_verification', 'value' => 'true', 'type' => 'boolean', 'group' => 'auth', 'label' => 'Email Verification'],
            ['key' => 'app.google_recaptcha', 'value' => 'true', 'type' => 'boolean', 'group' => 'auth', 'label' => 'Google reCAPTCHA'],
            ['key' => 'app.translation_enabled', 'value' => 'true', 'type' => 'boolean', 'group' => 'auth', 'label' => 'Google Translate'],

            // === Email / SMTP Config ===
            ['key' => 'email.from', 'value' => 'support@example.com', 'type' => 'string', 'group' => 'email', 'label' => 'Email From'],
            ['key' => 'email.name', 'value' => 'Support Team', 'type' => 'string', 'group' => 'email', 'label' => 'Email From Name'],
            ['key' => 'email.host', 'value' => 'smtp.example.com', 'type' => 'string', 'group' => 'email', 'label' => 'SMTP Host'],
            ['key' => 'email.port', 'value' => '465', 'type' => 'string', 'group' => 'email', 'label' => 'SMTP Port'],
            ['key' => 'email.encryption', 'value' => 'ssl', 'type' => 'string', 'group' => 'email', 'label' => 'SMTP Encryption'],
            ['key' => 'email.username', 'value' => 'user@example.com', 'type' => 'string', 'group' => 'email', 'label' => 'SMTP Username'],
            ['key' => 'email.password', 'value' => 'securepassword', 'type' => 'string', 'group' => 'email', 'label' => 'SMTP Password'],

            // === Google Login Config ===
            ['key' => 'google.client_id', 'value' => 'your-google-client-id', 'type' => 'string', 'group' => 'google_auth', 'label' => 'Google Client ID'],
            ['key' => 'google.client_secret', 'value' => 'your-google-client-secret', 'type' => 'string', 'group' => 'google_auth', 'label' => 'Google Client Secret'],
            ['key' => 'google.redirect_url', 'value' => 'http://yoursite.com/auth/google/callback', 'type' => 'string', 'group' => 'google_auth', 'label' => 'Google Redirect URL'],

            // === Google reCAPTCHA Config ===
            ['key' => 'recaptcha.site_key', 'value' => 'your-recaptcha-site-key', 'type' => 'string', 'group' => 'recaptcha', 'label' => 'Captcha Site Key'],
            ['key' => 'recaptcha.secret', 'value' => 'your-recaptcha-secret-key', 'type' => 'string', 'group' => 'recaptcha', 'label' => 'Captcha Secret Key'],
        ];

        foreach ($settings as $setting) {
            Settings::updateOrCreate(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'type' => $setting['type'],
                    'group' => $setting['group'],
                    'label' => $setting['label'] ?? null,
                    'description' => $setting['description'] ?? null,
                ]
            );
        }
    }
}
