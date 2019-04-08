<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class DentistaHasPaciente extends Model
{
    use Notifiable;

    protected $table = "dentista_has_paciente";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dentista_id', 
        'paciente_id', 
    ];
}
