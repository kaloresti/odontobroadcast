<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Agenda::class, function (Faker $faker) {
    return [
        'dt_inicio' => Carbon::now(), 
        'dt_fim' => Carbon::now(), 
        'paciente_id' => 1, 
        'dentista_id' => 1, 
        'consultorio_id' => 1, 
        'status' => 'ativo', 
        'assistente_id' => 1,
    ];
});
