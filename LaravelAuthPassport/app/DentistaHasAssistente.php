<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class DentistaHasAssistente extends Model
{
    use Notifiable;

    protected $table = "dentista_has_assistente";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'assistente_id', 
        'dentista_id', 
        'consultorio_id'
    ];
}
