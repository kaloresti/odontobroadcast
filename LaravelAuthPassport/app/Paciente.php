<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Paciente extends Model
{
    use Notifiable;

    protected $table = "paciente";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 
        'dt_nascimento', 
        'uf',
        'cidade',
        'bairro',
        'logradouro',
        'numero',
        'complemento',
        'cep',
        'rg',
        'cpf',
        'celular',
    ];
}
