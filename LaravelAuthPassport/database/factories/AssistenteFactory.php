<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Assistente::class, function (Faker $faker) {
    return [
        'nome' => $faker->name, 
        'rg' => str_random(10), 
        'cpf' => str_random(10), 
        'dt_nascimento' => Carbon::now(),
    ];
});
