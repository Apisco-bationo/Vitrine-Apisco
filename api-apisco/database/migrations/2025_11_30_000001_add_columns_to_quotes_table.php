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
        if (Schema::hasTable('quotes')) {
            Schema::table('quotes', function (Blueprint $table) {
                if (! Schema::hasColumn('quotes', 'company')) {
                    $table->string('company')->nullable()->after('phone');
                }
                if (! Schema::hasColumn('quotes', 'service')) {
                    $table->string('service')->nullable()->after('company');
                }
                if (! Schema::hasColumn('quotes', 'message')) {
                    $table->text('message')->nullable()->after('description');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('quotes')) {
            Schema::table('quotes', function (Blueprint $table) {
                if (Schema::hasColumn('quotes', 'company')) {
                    $table->dropColumn('company');
                }
                if (Schema::hasColumn('quotes', 'service')) {
                    $table->dropColumn('service');
                }
                if (Schema::hasColumn('quotes', 'message')) {
                    $table->dropColumn('message');
                }
            });
        }
    }
};
