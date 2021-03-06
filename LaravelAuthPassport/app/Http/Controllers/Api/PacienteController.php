<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Paciente;
use App\Dentista;
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
            ->select('paciente.*',
            DB::raw('DATE_FORMAT(paciente.created_at, "%d/%m/%Y") as data_cadastro'),
            DB::raw('DATE_FORMAT(paciente.dt_nascimento, "%d/%m/%Y") as data_nascimento'))
            
            ->join('dentista_has_paciente', 'dentista_has_paciente.paciente_id' , '=', 'paciente.id')
            //->join('dentista_has_paciente', 'dentista_has_paciente.dentista_id', '=', 'dentista.id')
            ->join('dentista', 'dentista_has_paciente.dentista_id', '=', 'dentista.id')
            ->where('dentista.user_id', $idUser)
            ->orderBy('paciente.created_at', 'desc')
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
                "rg" => $data->rg,
                "celular" => $data->celular,
                "cpf" => $data->cpf
            ]);
    
            if($createPaciente->id)
            {
                $dentista = Dentista::where('user_id',$data->user_id)->get()->first();

                $createPacienteHasPlano = PacienteHasPlano::create([
                    "paciente_id" => $createPaciente->id,
                    "plano_id" => $data->plano_id
                ]);
    
                $createDentistaHasPaciente = DentistaHasPaciente::create([
                    "dentista_id" => $dentista->id,
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
