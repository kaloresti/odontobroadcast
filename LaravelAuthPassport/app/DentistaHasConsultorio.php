<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class DentistaHasConsultorio extends Model
{
    use Notifiable;

    protected $table = "dentista_has_consultorio";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dentista_id', 
        'consultorio_id', 
    ];
}
