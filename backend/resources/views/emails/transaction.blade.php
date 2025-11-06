@component('mail::message')
# {{ $title }}

Hello {{ $transaction->user->name }},

@if($transaction->status === 'completed')
We have successfully processed your {{ $type }} of ${{ number_format($transaction->amount, 2) }}.
@elseif($transaction->status === 'cancelled')
Unfortunately, your {{ $type }} of ${{ number_format($transaction->amount, 2) }} has been rejected.
@else
Your {{ $type }} of ${{ number_format($transaction->amount, 2) }} is being processed.
@endif

**Reference:** {{ $transaction->reference ?? 'N/A' }}

Thanks,<br>
{{ $fromName }}
@endcomponent
