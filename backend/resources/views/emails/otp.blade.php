@component('mail::message')
@if ($type === 'password_reset')
# Reset Your Password

Click the button below to reset your password:

@component('mail::button', ['url' => $data])
Reset Password
@endcomponent

If you did not request a password reset, no further action is required.
@elseif ($type === 'password_change')
# Password Changed

Your password has been successfully updated. If this wasn't you, please contact support immediately.

@else

# Email Verification

Your OTP code is: **{{ $data }}**

@endif

Thanks,<br>
{{ $fromName }}
@endcomponent
