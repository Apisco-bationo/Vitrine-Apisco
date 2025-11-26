<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only create the table if it doesn't already exist. This avoids
        // failures when the physical table is present but the migration
        // wasn't recorded in the migrations table.
        if (! Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->foreignId('service_id')->nullable()->constrained('services')->onDelete('set null');
                $table->text('custom_description')->nullable();
                $table->decimal('amount', 12, 2)->nullable();
                $table->string('status')->default('pending');
                $table->text('admin_notes')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
