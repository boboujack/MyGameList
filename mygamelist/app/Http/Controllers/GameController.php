<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
//Usaremos esta clase para la que la función indexAllGames no se ejecute tantas veces
use Illuminate\Support\Facades\Cache;

class GameController extends Controller
{
    //Muestra todos los games, con sus posibles relaciones 
    public function index()
    {
        $games = Game::with('users')->get(); // Cargar los datos de la tabla pivote junto con los juegos
        
        $formattedGames = [];

        foreach ($games as $game) {
            foreach ($game->users as $user) {
                $formattedGame = [
                    'id' => $game->id,
                    'title' => $game->title,
                    'releaseDate' => $game->releaseDate,
                    'synopsis' => $game->synopsis,
                    'image_url' => $game->image_url,
                    'created_at' => $game->created_at,
                    'updated_at' => $game->updated_at,
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'game_id' => $user->pivot->game_id,
                    'statusCompleted' => $user->pivot->statusCompleted,
                    'onList' => $user->pivot->onList
                ];
    
                $formattedGames[] = $formattedGame;
            }
        }
    
        return response()->json($formattedGames);
    
        /*$games= Game::all();
        return response()->json($games);*/
    }

    //Muestra solo los games
    public function indexAllGames()
    {
        //Se almacena la petición en cache durante 60 segundos
        $games = Cache::remember('games_all', 60, function () {
            return Game::all();
        });
    
        return response()->json($games);
    }

    public function create()
    {
        //
    }

    /*Almacenamos una instancia y mandamos
    un mensaje de que todo ha salido bien*/
    public function store(Request $request)
    {
        // Crear el nuevo juego
        $game = new Game;
        $game->title = $request->title;
        $game->releaseDate = $request->releaseDate;
        $game->synopsis = $request->synopsis;
        if ($request->has('image_url')) {
            $game->image_url = $request->image_url;
        }
        $game->save();
    
        // Limpiamos el caché después de agregar un nuevo juego
        Cache::forget('games_all');

        // Obtener todos los usuarios
        $users = User::all();
    
        // Asociar el nuevo juego a todos los usuarios con onList = 0
        foreach ($users as $user) {
            $user->games()->attach($game->id, ['onList' => false]);
        }
    
        // Devolver la respuesta JSON
        $data = [
            'message' => 'Game created successfully',
            'game' => $game
        ];
        return response()->json($data);
    }


    //Devolvemos el juego
    public function show(Game $game)
    {
        $game->load('users'); // Cargar los datos de la tabla pivote para un juego específico
        $data = [
            'game' => $game
        ];
        return response()->json($data);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $game)
    {
        $game->title= $request->title;
        $game->releaseDate= $request->releaseDate;
        $game->synopsis= $request->synopsis;
        $game->image_url= $request->image_url;
        $game->save();

        // Limpiamos el caché después de actualizar un nuevo juego
        Cache::forget('games_all');

        // Actualizar el estado de completado en la tabla pivote
        if ($request->has('user_id') && $request->has('statusCompleted')) {
            $user_id = $request->user_id;
            $statusCompleted = $request->statusCompleted;
            $onList = $request->onList;
            $game->users()->updateExistingPivot($user_id, ['statusCompleted' => $statusCompleted]);
            $game->users()->updateExistingPivot($user_id, ['onList' => $onList]);
        }
        // Cargar los datos actualizados del juego, incluyendo los datos de la tabla pivote
        $game->load('users');
        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'Game updated successfully',
            'game'=> $game
        ];
        return response()-> json($data);
    }

    //Actualizamos el campo onList para x game de x user
    public function updateOnList(Request $request, Game $game){   
        // Actualizar el estado de completado en la tabla pivote
        $user_id = $request->user_id;
        $onList = $request->onList;
        $game->users()->updateExistingPivot($user_id, ['onList' => $onList]);
        
        // Limpiamos el caché después de actualizar un nuevo juego
        Cache::forget('games_all');

        $game->save();
        $game->load('users');
        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'Game updated successfully',
            'game'=> $game
        ];
        return response()-> json($data);
    }

    //Actualizamos el campo statusCompleted para x game de x user
    public function updateStatusCompleted(Request $request, Game $game){
    
        // Actualizar el estado de completado en la tabla pivote
        $user_id = $request->user_id;
        $statusCompleted = $request->statusCompleted;
        $game->users()->updateExistingPivot($user_id, ['statusCompleted' => $statusCompleted]);
        
        // Limpiamos el caché después de actualizar un nuevo juego
        Cache::forget('games_all');

        $game->save();
        $game->load('users');
        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'Game updated successfully',
            'game'=> $game
        ];
        return response()-> json($data);
    }

    //Borra al game con sus relaciones a la tabla pivote
    public function destroy(Game $game)
    {
        try{
            // Eliminar las relaciones en la tabla pivote
            $game->users()->detach();
    
            $game-> delete();
    
            // Limpiamos el caché después de borrar un nuevo juego
            Cache::forget('games_all');
    
            //Devolvemos el resultado
            return response()->json(['message' => 'Juego eliminado correctamente.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el juego.'], 500);
        }
    }


    //Enlaza un game con un user
    public function attach(Request $request){
        $game= Game::find($request->game_id);
        /*La relación user_game_lists (que definimos en el modelo Game.php)
        la enlazamos a un user*/
        $game->users()->attach($request->user_id);
        $data= [
            'message'=> 'User attached successfully',
            'game'=> $game
        ];
        return response()-> json($data);
    }

    //Desenlazamos un game con un user
    public function detach(Request $request){
        $game= Game::find($request->game_id);
        $game->users()->detach($request->user_id);
        $data= [
            'message'=> 'User detached successfully',
            'game'=> $game
        ];
        return response()-> json($data);
    }

}