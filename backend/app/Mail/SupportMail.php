<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\HelpRequest;
use Illuminate\Mail\Mailables\Address;

class SupportMail extends Mailable
{
    use Queueable, SerializesModels;

    public $helpRequest;
    public $supportName;
    public $isReply;
    public $replyMessage;

    public function __construct(HelpRequest $helpRequest, $supportName, $isReply = false, $replyMessage = null)
    {
        $this->helpRequest = $helpRequest;
        $this->supportName = $supportName;
        $this->isReply = $isReply;
        $this->replyMessage = $replyMessage;
    }

    public function envelope(): \Illuminate\Mail\Mailables\Envelope
    {
        $subject = $this->isReply
            ? 'We’ve received your support request'
            : 'New Support Request from ' . $this->helpRequest->name;

        return new \Illuminate\Mail\Mailables\Envelope(
            from: new Address(config('mail.from.address'), $this->supportName),
            subject: $subject
        );
    }

    public function content(): \Illuminate\Mail\Mailables\Content
    {
        return new \Illuminate\Mail\Mailables\Content(
            markdown: 'emails.support',
            with: [
                'helpRequest' => $this->helpRequest,
                'isReply' => $this->isReply,
                'supportName' => $this->supportName,
                'replyMessage' => $this->replyMessage,
            ]
        );
    }
}
