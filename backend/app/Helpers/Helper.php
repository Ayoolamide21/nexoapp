<?php

use App\Mail\OtpMail;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionMail;

if (!function_exists('applyMailSettings')) {
  function applyMailSettings()
  {
    // Fetch DB email settings
    $settings = DB::table('settings')
      ->where('type', 'string')
      ->whereIn('group', ['email', 'app'])
      ->pluck('value', 'key')
      ->toArray();

    Config::set('mail.default', $settings['email.mailer'] ?? config('mail.default'));
    Config::set('mail.mailers.smtp.host', $settings['email.host'] ?? config('mail.mailers.smtp.host'));
    Config::set('mail.mailers.smtp.port', $settings['email.port'] ?? config('mail.mailers.smtp.port'));
    Config::set('mail.mailers.smtp.encryption', $settings['email.encryption'] ?? config('mail.mailers.smtp.encryption'));
    Config::set('mail.mailers.smtp.username', $settings['email.username'] ?? config('mail.mailers.smtp.username'));
    Config::set('mail.mailers.smtp.password', $settings['email.password'] ?? config('mail.mailers.smtp.password'));


    Config::set('mail.from.address', $settings['email.from'] ?? config('mail.from.address'));
    Config::set('mail.from.name', $settings['email.name'] ?? config('mail.from.name'));

    return $settings;
  }
}

if (!function_exists('sendTransactionMail')) {
  function sendTransactionMail($user, $transaction, $type, $subject = null, $title = null)
  {
    // Apply DB mail settings and get sender info
    $settings = applyMailSettings();

    $fromEmail = $settings['email.from'] ?? config('mail.from.address');
    $fromName  = $settings['email.name'] ?? config('mail.from.name');
    $subject   = $subject ?? 'Deposit Confirmation';
    $title     = $title ?? 'We have successfully processed your deposit.';

    // Ensure $user is a model
    if (is_int($user)) {
      $user = \App\Models\User::find($user);
    }

    if ($type === 'otp' || $type === 'password_reset' || $type === 'password_change') {
      Mail::to($user->email)->send(
        new OtpMail($transaction, $fromEmail, $fromName, $subject, $type)
      );
      return;
    }

    if ($user && $user->email) {
      Mail::to($user->email)->send(
        new TransactionMail($transaction, $type, $fromEmail, $fromName, $subject, $title)
      );
    }
  }
}
