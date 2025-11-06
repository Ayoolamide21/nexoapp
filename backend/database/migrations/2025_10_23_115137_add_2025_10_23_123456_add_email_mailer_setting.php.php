<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Get the position/order of the 'app.translation_enabled' setting
        $translationSetting = DB::table('settings')->where('key', 'app.translation_enabled')->first();

        // Determine the new position: one greater than translation_enabled if you track order,
        // else just insert without ordering if you don't have a position/order column.
        // For this example, assume no order column — just insert normally.

        DB::table('settings')->insert([
            'key' => 'email.mailer',
            'value' => 'smtp',
            'type' => 'string',
            'group' => 'email',
            'label' => 'Mail Driver',
            'description' => 'Choose the mail driver (smtp, mailgun, sendmail, etc.)',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')->where('key', 'email.mailer')->delete();
    }
};
