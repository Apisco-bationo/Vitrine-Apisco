<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('quotes')) {
            Schema::create('quotes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
                $table->string('name');
                $table->string('email');
                $table->string('phone')->nullable();
                $table->text('description');
                $table->decimal('budget', 12, 2)->nullable();
                $table->date('preferred_deadline')->nullable();
                $table->string('status')->default('new');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
