<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Assistente;
use App\Dentista;
use App\DentistaHasAssistente;

class AssistenteController extends Controller
{
    public function getForDentista($idDentista)
    {
        $assistentes = (object) DB::table('assistente')
            ->select('assistente.*', 
            DB::raw('DATE_FORMAT(assistente.created_at, "%d/%m/%Y") as data_cadastro'),
            DB::raw('DATE_FORMAT(assistente.dt_nascimento, "%d/%m/%Y") as data_nascimento'))
            ->join('dentista_has_assistente', 'dentista_has_assistente.assistente_id', '=', 'assistente.id')
            ->join('dentista', 'dentista.id', '=', 'dentista_has_assistente.dentista_id')
            ->where('dentista.user_id', $idDentista)
            ->get();
                
        return response()->json([
            'data' => $assistentes
        ]);
    }

    // public function list($idUser)
    // {
    //     $consultorios = (object) DB::table('consultorio')
    //         ->select('consultorio.*', DB::raw('DATE_FORMAT(consultorio.created_at, "%d/%m/%Y") as data_cadastro'))
    //         ->join('dentista_has_consultorio', 'consultorio.id', '=', 'dentista_has_consultorio.consultorio_id')
    //         ->join('dentista', 'dentista_has_consultorio.dentista_id', '=', 'dentista.id')
    //         ->where('dentista.user_id', $idUser)
    //         ->orderBy('consultorio.created_at', 'desc')
    //         ->get();
                
    //     return response()->json([
    //         'data' => $consultorios
    //     ]);
    // }

    public function store(Request $request)
    {
        $data = (object)$request->all();
        error_log(print_r($request->all(), true), 0);
        $createAuxiliar = Assistente::create([
            'nome' => $data->nome, 
            'rg' => '0000000', 
            'cpf' => $data->cpf, 
            'dt_nascimento' => $data->dt_nascimento, 
            'tipo' => $data->tipo
        ]);
        
        if($createAuxiliar->id)
        {
            $dentista = Dentista::where('user_id',$data->user_id)->get()->first();
            
            $createDentistaHasAuxiliar = DentistaHasAssistente::create([
                'dentista_id' => $dentista->id, 
                'consultorio_id' => $data->consultorio_id, 
                'assistente_id' => $createAuxiliar->id
            ]);

            return response()->json([
                'data' => $createAuxiliar
            ]);
        }
        
        return response()->json([
            'data' => ''
        ]);
    }
}
