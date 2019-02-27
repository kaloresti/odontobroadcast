<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Consultorio extends Model
{
    use Notifiable;

    protected $table = "consultorio";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uf', 
        'cidade', 
        'bairro', 
        'numero', 
        'logradouro', 
        'complemento', 
        'cep',
        'nome',
        'latitude',
        'longitude',
    ];
}
