<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Paciente;
use App\PacienteHasPlano;
use App\DentistaHasPaciente;

class PacienteController extends Controller
{
    public function getAll()
    {
        $pacientes = (object) DB::table('paciente')
            ->select('paciente.*')
            ->get();
                
        return response()->json([
            'data' => $pacientes
        ]);
    }

    // -- este método não está em uso
    public function list($idUser)
    {
        //$dentista = (object) DB::table('dentista')->where('user_id', $idUser)->get();
        $pacientes = (object) DB::table('paciente')
            ->select('paciente.*')
            ->join('dentista_has_paciente', 'dentista_has_paciente.paciente_id' , '=', 'paciente.id')
            //->join('dentista_has_paciente', 'dentista_has_paciente.dentista_id', '=', 'dentista.id')
            ->join('dentista', 'dentista_has_paciente.dentista_id', '=', 'dentista.id')
            ->where('dentista.user_id', $idUser)
            ->get();
                
        return response()->json([
            'data' => $pacientes
        ]);
    }

    public function store(Request $request)
    {
        $data = (object)$request->all();

        $pacientes = DB::table('paciente')
            ->select('paciente.*')
            ->where('paciente.cpf', '=', $data->cpf)
            ->get();

        if(count($pacientes) == 0)
        {
            $createPaciente = Paciente::create([
                "uf" => $data->uf, 
                "cidade" => $data->cidade, 
                "bairro" => $data->bairro, 
                "numero" => $data->numero, 
                "logradouro" => $data->logradouro, 
                "complemento" => $data->complemento, 
                "cep" => $data->cep,
                "latitude" => $data->latitude,
                "longitude" => $data->longitude,
                "nome" => $data->nome,
                "dt_nascimento" => $data->dt_nascimento,
                "rg" => "0000000",
                "celular" => $data->celular,
                "cpf" => $data->cpf
            ]);
    
            if($createPaciente->id)
            {
                $createPacienteHasPlano = PacienteHasPlano::create([
                    "paciente_id" => $createPaciente->id,
                    "plano_id" => $data->plano_id
                ]);
    
                $createDentistaHasPaciente = DentistaHasPaciente::create([
                    "dentista_id" => $data->dentista_id,
                    "paciente_id" => $createPaciente->id
                ]);
    
                return response()->json([
                    'data' => $createPaciente,
                    'message' => "paciente cadastrado com sucesso!"
                ]);
            }
            
            
            return response()->json([
                'data' => '',
                'message' => 'erro ao cadastrar paciente'
            ]);
        } else {
            return response()->json([
                'data' => '',
                'message' => 'paciente já cadastrado (CPF duplicado)!'
            ]);
        }
        
    }
    
}
