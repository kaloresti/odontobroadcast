<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsultorioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultorio', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uf');
            $table->string('cidade');
            $table->string('bairro');
            $table->string('numero');
            $table->string('logradouro');
            $table->string('complemento');
            $table->string('cep');
            $table->string('nome');
            $table->string('latitude');
            $table->string('longitude');
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
        Schema::dropIfExists('consultorio');
    }
}
