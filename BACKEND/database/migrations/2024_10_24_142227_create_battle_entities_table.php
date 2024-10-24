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
        Schema::create('battle_entities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('battle_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('entity_id');
            $table->integer('initiative')->nullable();
            $table->integer('x');
            $table->integer('y');
            $table->boolean('dead')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('battle_entities');
    }
};
