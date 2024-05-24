<?php

namespace App\Http\Controllers;

use App\Models\User_Game_Lists;
use Illuminate\Http\Request;
/*Imprescindible importar esta clase*/
use Illuminate\Support\Facades\DB;

class UserGameListsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los registros de la tabla pivote
        $userGameLists = DB::table('user_game_lists')->get();

        // Devolver los registros de la tabla pivote como respuesta JSON
        return response()->json(['user_game_lists' => $userGameLists]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User_Game_Lists $user_Game_Lists)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User_Game_Lists $user_Game_Lists)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User_Game_Lists $user_Game_Lists)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User_Game_Lists $user_Game_Lists)
    {
        //
    }
}
