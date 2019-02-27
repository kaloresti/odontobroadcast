<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Assistente extends Model
{
    use Notifiable;

    protected $table = "assistente";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 
        'rg', 
        'cpf', 
        'dt_nascimento', 
    ];
}
