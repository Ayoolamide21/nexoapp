@component('mail::message')
@if ($isReply)
# Reply from {{ $supportName }}

{!! nl2br(e($replyMessage)) !!}

---

You previously wrote:
> {{ $helpRequest->message }}

Thanks,  
**{{ $supportName }}**

@else
# New Support Request

**Name:** {{ $helpRequest->name }}  
**Email:** {{ $helpRequest->email }}

**Message:**  
> {{ $helpRequest->message }}

@component('mail::button', ['url' => url('/admin/support/' . $helpRequest->id)])
View in Admin
@endcomponent

@endif
@endcomponent