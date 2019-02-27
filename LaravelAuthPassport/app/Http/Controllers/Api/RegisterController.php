<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\User;

class RegisterController extends Controller
{

    public function register (Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'cro' => 'required',
            'cro_uf' => 'required',
            'cpf' => 'required',
            'especialidade' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'cro' => $request->name,
            'cro_uf' => $request->cro_uf,
            'cpf' => $request->email,
            'especialidade' => is_array($request->especialidade) ? implode(';', $request->especialidade) : $request->especialidade,
        ]);

        return response()->json([
            'success' => 'Obrigado por se cadastrar no ODONTO-BROADCAST !!'
        ]);
    }

    public function verifyExistUser (Request $request)
    {
        $exist = false;

        $user = (object) DB::table('users')->where('email', trim($request->email))->get();
             
        if (isset($user[0]->id)) {
            $exist = true;
        }
        
        return response()->json([
            'exist' => $exist
        ]);
    }

    public function requestCodePass(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string|email|max:255'
        ]);

        $exist = false; 
        $user = (object) DB::table('users')->where('email', trim($request->email))->get();
        //var_dump($user);
        if(isset($user[0]->id)) {
            return response()->json([
                'success' => true,
                'message' => '',
                'data' => $user
            ]);
        }

        return response()->json([
            'error' => true,
            'message' => "usuário não cadastrado"
        ]);
            
    }

}
