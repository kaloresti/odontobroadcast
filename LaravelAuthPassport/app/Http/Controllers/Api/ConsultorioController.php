<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Consultorio;
use App\DentistaHasConsultorio;
use App\Dentista;

class ConsultorioController extends Controller
{
    public function getAll()
    {
        $consultorios = (object) DB::table('consultorio')
            ->select('consultorio.*')
            ->get();
                
        return response()->json([
            'data' => $consultorios
        ]);
    }

    public function list($idUser)
    {
        $consultorios = (object) DB::table('consultorio')
            ->select('consultorio.*', DB::raw('DATE_FORMAT(consultorio.created_at, "%d/%m/%Y") as data_cadastro'))
            ->join('dentista_has_consultorio', 'consultorio.id', '=', 'dentista_has_consultorio.consultorio_id')
            ->join('dentista', 'dentista_has_consultorio.dentista_id', '=', 'dentista.id')
            ->where('dentista.user_id', $idUser)
            ->orderBy('consultorio.created_at', 'desc')
            ->get();
                
        return response()->json([
            'data' => $consultorios
        ]);
    }

    public function store(Request $request)
    {
        $data = (object)$request->all();
        //error_log(print_r(Auth::user(), true), 0);
        $createConsultorio = Consultorio::create([
            "uf" => $data->uf, 
            "cidade" => $data->cidade, 
            "bairro" => $data->bairro, 
            "numero" => $data->numero, 
            "logradouro" => $data->logradouro, 
            "complemento" => $data->complemento, 
            "cep" => $data->cep,
            "nome" => $data->nome,
            "latitude" => '0000000000',
            "longitude" => '0000000000',
        ]);
        
        if($createConsultorio->id)
        {
            $consultaDentista = Dentista::where('user_id',$data->user_id)->get()->first();
            
            $createDentistaHasConsultorio = DentistaHasConsultorio::create([
                'dentista_id' => $consultaDentista->id, 
                'consultorio_id' => $createConsultorio->id, 
            ]);

            return response()->json([
                'data' => $createConsultorio
            ]);
        }
        
        return response()->json([
            'data' => ''
        ]);
    }

    public function edit($idConsultorio)
    {

    }

    public function update(Request $request)
    {

    }

    public function delete()
    {

    }
}
