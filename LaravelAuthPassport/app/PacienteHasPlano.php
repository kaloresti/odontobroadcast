<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PacienteHasPlano extends Model
{
    protected $table = "paciente_has_plano";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'plano_id', 
        'paciente_id',      
    ];
}
