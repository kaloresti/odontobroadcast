<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Plano;

class PlanoController extends Controller
{
    public function getAll()
    {
        $planos = (object) DB::table('plano')
            ->select('plano.*')
            ->get();
                
        return response()->json([
            'data' => $planos
        ]);
    }
}
