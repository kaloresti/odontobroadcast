<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Dentista extends Model
{
    use Notifiable;

    protected $table = "dentista";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 
        'cro_uf', 
        'cro', 
        'dt_nascimento', 
        'rg', 
        'cpf', 
    ];
}
