<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('help_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('help_request_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable(); // null means admin reply
            $table->text('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('help_replies');
    }
};
