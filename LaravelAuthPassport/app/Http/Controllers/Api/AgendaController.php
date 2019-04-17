<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Agenda;
use App\Dentista;

class AgendaController extends Controller
{
    public function store(Request $request) 
    {
        //$data = (object)$request->all();

        $this->validate($request, [
            'dt_inicio' => 'required', 
            //'dt_fim' => 'required', 
            'paciente_id' => 'required', 
            //'dentista_id' => 'required', 
            'consultorio_id' => 'required', 
            //'status' => 'required', 
            //'assistente_id' => 'required'
        ]);
        $consultaDentista = Dentista::where('user_id',$request->user_id)->get()->first();
        $agenda = Agenda::create([
            'dt_inicio' => $request->dt_inicio.' '.$request->hr_inicio, 
            'dt_fim' => $request->dt_inicio.' '.$request->hr_fim,
            'paciente_id' => $request->paciente_id, 
            'dentista_id' => $consultaDentista->id,
            'consultorio_id' => $request->consultorio_id, 
            'status' => 'agendado',
            'assistente_id' => 1,
        ]);

        return response()->json([
            'data' => $agenda,
            'message' => 'Agendamento realidado com sucesso'
        ]);
    }

    public function list($data, $idUser)
    {
        $data = date('Y-m-d', strtotime($data));
        error_log("Data: ".$data);
        $agenda = (object) DB::table('agenda')
            ->join('paciente', 'paciente.id', 'agenda.paciente_id')
            ->join('dentista', 'dentista.id', 'agenda.dentista_id')
            ->join('consultorio', 'consultorio.id', 'agenda.consultorio_id')
            ->join('assistente', 'assistente.id', 'agenda.assistente_id')
            ->where([
                ['dentista.user_id', '=' , $idUser],
                [DB::raw('DATE_FORMAT(agenda.dt_inicio, "%Y-%m-%d")'), '=', $data]
            ])
            ->select('paciente.nome as paciente', 
                        'agenda.*', 
                        DB::raw('DATE_FORMAT(agenda.dt_inicio, "%d/%m/%Y") as data'),
                        DB::raw('DATE_FORMAT(agenda.dt_inicio, "%h:%i") as hora_inicio'),
                        DB::raw('DATE_FORMAT(agenda.dt_fim, "%h:%i") as hora_final'),
                        'dentista.nome as dentista', 
                        'consultorio.nome as consultorio', 
                        'assistente.nome as assistente')
            ->get();
                
        return response()->json([
            'data' => $agenda
        ]);
    }

    public function desmarcar($agenda_id)
    {
        if(Agenda::where('id',$id)->delete())
        {
            return response()->json([
                'message' => "Consulta desmarcada com sucesso!"
            ]);
        }

        return response()->json([
            'message' => "Erro ao tentar desmarcar consulta!"
        ]);
    }
}
