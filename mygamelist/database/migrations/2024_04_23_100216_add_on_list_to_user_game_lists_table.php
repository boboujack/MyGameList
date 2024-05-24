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
        Schema::table('user_game_lists', function (Blueprint $table) {
            $table->boolean('onList')->default(false);
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('user_game_lists', function (Blueprint $table) {
            $table->dropColumn('onList');
        });
    }
    
};
