<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Dentista::class, function (Faker $faker) {
    return [
        'nome' => $faker->name, 
        'cro_uf' => 'PA', 
        'cro' => '1234', 
        'dt_nascimento' => Carbon::now(), 
        'rg' => str_random(10), 
        'cpf' => str_random(11), 
    ];
});
