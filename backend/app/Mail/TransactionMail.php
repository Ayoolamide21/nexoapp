<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class TransactionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $transaction;
    public $type;
    public $fromName;
    public $fromEmail;
    public $subject;

    public $title;

    /**
     * Create a new message instance.
     */
    public function __construct($transaction, $type, $fromEmail, $fromName, $subject, $title)
    {
        $this->transaction = $transaction;
        $this->type = $type;
        $this->fromEmail = $fromEmail;
        $this->fromName = $fromName;
        $this->subject = $subject;
        $this->title = $title;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->fromEmail, $this->fromName),
            subject: $this->subject
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.transaction',
            with: [
                'transaction' => $this->transaction,
                'type' => $this->type,
                'fromName' => $this->fromName,
                'title' => $this->title,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
