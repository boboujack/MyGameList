<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryGameListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_game_list', function (Blueprint $table) {
            $table->id();

            //Creamos la columna de category_id y hacemos la clave foranea
            $table->unsignedBigInteger('category_id')->index();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            //Creamos la columna de game_id y hacemos la clave foranea
            $table->unsignedBigInteger('game_id')->index();
            $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
           
            /*Con ->index() mejoramos el rendimiento de las consultas
            Y con ->onDelete('cascade') nos aseguramos que al eliminar un juego
            o categoría se elimine tambien la tabla pivote*/

            $table->boolean('onCategory')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_game_list');
    }
}
