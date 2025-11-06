<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('payment_gateways', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('public_key')->nullable();
            $table->string('secret_key')->nullable();
            $table->boolean('status')->default(false);
            $table->enum('environment', ['sandbox', 'production', 'both'])->default('sandbox');
            $table->string('currency')->default('USD');
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payment_gateways');
    }
};
