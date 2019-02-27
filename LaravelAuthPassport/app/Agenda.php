<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Agenda extends Model
{
    use Notifiable;

    protected $table = "agenda";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dt_inicio', 
        'dt_fim', 
        'paciente_id', 
        'dentista_id', 
        'consultorio_id', 
        'status', 
        'assistente_id',
    ];

}
