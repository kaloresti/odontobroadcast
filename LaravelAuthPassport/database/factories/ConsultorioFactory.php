<?php

use Faker\Generator as Faker;

$factory->define(App\Consultorio::class, function (Faker $faker) {
    return [
        'uf' => 'PA', 
        'cidade' => 'Belém', 
        'bairro' => 'Marco', 
        'numero' => '57', 
        'logradouro' => 'Travessa Humaitá', 
        'complemento' => 'Entre passagem Jarina e passagem Castanheira', 
        'cep' => '66095-220',
        'nome' => $faker->name,
        'latitude' => str_random(10),
        'longitude' => str_random(10),
    ];
});
