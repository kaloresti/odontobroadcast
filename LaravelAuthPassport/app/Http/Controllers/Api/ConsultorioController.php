<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Consultorio;
use App\DentistaHasConsultorio;

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
            ->select('consultorio.*')
            ->join('dentista_has_consultorio', 'consultorio.id', '=', 'dentista_has_consultorio.consultorio_id')
            ->join('dentista', 'dentista_has_consultorio.dentista_id', '=', 'dentista.id')
            ->where('dentista.user_id', $idUser)
            ->get();
                
        return response()->json([
            'data' => $consultorios
        ]);
    }

    public function store(Request $request)
    {
        $data = (object)$request->all();

        $createConsultorio = Consultorio::create([
            "uf" => $data->uf, 
            "cidade" => $data->cidade, 
            "bairro" => $data->bairro, 
            "numero" => $data->numero, 
            "logradouro" => $data->logradouro, 
            "complemento" => $data->complemento, 
            "cep" => $data->cep,
            "nome" => $data->nome,
            "latitude" => $data->latitude,
            "longitude" => $data->longitude,
        ]);
        
        if($createConsultorio->id)
        {
            $createDentistaHasConsultorio = DentistaHasConsultorio::create([
                'dentista_id' => $data->dentista_id, 
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
