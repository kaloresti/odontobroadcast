<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
    ]);
});

Route::post('register', 'Api\RegisterController@register');
Route::post('verifyExistUser', 'Api\RegisterController@verifyExistUser');
Route::post('/requestCodePass', 'Api\RegisterController@requestCodePass');

Route::get('/agenda/list/{data}/{idUser}', 'Api\AgendaController@list');
Route::post('/agenda/store', 'Api\AgendaController@store');
Route::post('/agenda/edit', 'Api\AgendaController@edit');
Route::post('/agenda/{agenda_id}/desmarcar', 'Api\AgendaController@desmarcar');

Route::get('/consultorios/listall', 'Api\ConsultorioController@getAll');
Route::get('/consultorios/list/{idDentista}', 'Api\ConsultorioController@list');
Route::post('/consultorios/store', 'Api\ConsultorioController@store');

Route::get('/pacientes/listall', 'Api\PacienteController@getAll');
Route::get('/pacientes/list/{idDentista}', 'Api\PacienteController@list');
Route::post('/pacientes/store', 'Api\PacienteController@store');

Route::get('/planos/listall', 'Api\PlanoController@getAll');
