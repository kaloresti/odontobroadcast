<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'cro' => $request->name,
            'cro_uf' => $request->cro_uf,
            'cpf' => $request->email,
        ]);

        return response()->json([
            'success' => 'User created'
        ]);
    }

}
