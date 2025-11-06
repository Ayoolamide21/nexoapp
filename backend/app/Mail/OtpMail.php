<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;



class OtpMail extends Mailable
{
  use Queueable, SerializesModels;

  public $data;
  public $fromEmail;
  public $fromName;
  public $subjectLine;
  public $type;

  /**
   * Create a new message instance.
   *
   * @param mixed $data OTP code or reset link
   * @param string $fromEmail
   * @param string $fromName
   * @param string $subjectLine
   * @param string $type
   */
  public function __construct($data, $fromEmail, $fromName, $subjectLine, $type = 'otp')
  {
    $this->data = $data;
    $this->fromEmail = $fromEmail;
    $this->fromName = $fromName;
    $this->subjectLine = $subjectLine;
    $this->type = $type;
  }

  public function build()
  {

    $appName = DB::table('settings')
      ->where('type', 'string')
      ->where('key', 'app.site_name')
      ->value('value');

    Config::set('app.name', $appName);



    return $this->from($this->fromEmail, $this->fromName)
      ->subject($this->subjectLine)
      ->markdown('emails.otp')
      ->with([
        'data' => $this->data,
        'fromName' => $this->fromName,
        'type' => $this->type,
        'appName' => $appName,
      ]);
  }
}
