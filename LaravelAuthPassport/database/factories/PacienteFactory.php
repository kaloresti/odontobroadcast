<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Paciente::class, function (Faker $faker) {
    return [
        'nome' => $faker->name, 
        'dt_nascimento' => Carbon::now(), 
        'uf' => 'PA',
        'cidade' => 'Belém',
        'bairro' => 'Nazaré',
        'logradouro' => 'Avenida Nazaré',
        'numero' => '2526',
        'complemento' => 'Em frente ao colégio Gentil',
        'cep' => '66998-250',
        'rg' => str_random(10),
        'cpf' => str_random(11),
        'celular' => '99999-9999',
    ];
});
