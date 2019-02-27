<?php

use Faker\Generator as Faker;

$factory->define(App\DentistaHasConsultorio::class, function (Faker $faker) {
    return [
        'dentista_id' => 1,
        'consultorio_id' => 1,
    ];
});
