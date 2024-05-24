<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function allUsers()
    {
        $users = User::all(); // Obtener todos los usuarios

        $formattedUsers = [];
    
        foreach ($users as $user) {
            $userData = [
                'id' => $user->id,
                'name' => $user->name
            ];
    
            $formattedUsers[] = $userData;
        }
    
        return response()->json($formattedUsers);

    }

    public function index()
    {
        $users = User::with('games')->get(); // Cargar los datos de la tabla pivote junto con los usuarios
        
        $formattedUsers = [];
    
        foreach ($users as $user) {
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'profileDescription' => $user->profileDescription,
                'games' => []
            ];
    
            foreach ($user->games as $game) {
                $gameData = [
                    'id' => $game->id,
                    'title' => $game->title,
                    'releaseDate' => $game->releaseDate,
                    'synopsis' => $game->synopsis,
                    'created_at' => $game->created_at,
                    'updated_at' => $game->updated_at,
                    'statusCompleted' => $game->pivot->statusCompleted,
                    'onList' => $game->pivot->onList
                ];
    
                $userData['games'][] = $gameData;
            }
    
            $formattedUsers[$user->id] = $userData;
        }
    
        return response()->json(array_values($formattedUsers));
    }

    public function update(Request $request, User $user)
{
        /*Estos If's permiten no tener que rellenar todos los campos */
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('profileDescription')) {
            $user->profileDescription = $request->profileDescription;
        }
        $user->save();

        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'User updated successfully',
            'user'=> $user
        ];

        return response()->json($user);
    }

    public function updatePassword(Request $request, User $user)
{
        $user->password= $request->password;
        $user->save();

        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'User updated successfully',
            'user'=> $user
        ];

        return response()->json($user);
    }

    public function show($id)
    {
        // Buscar el usuario por su ID junto con los datos de la tabla pivote y los juegos relacionados
        $user = User::with('games')->findOrFail($id);
    
        // Inicializar un array para almacenar todos los juegos del usuario
        $allGames = [];
    
        foreach ($user->games as $game) {
            // Formatear los datos del juego
            $gameData = [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'id' => $game->id,
                'title' => $game->title,
                'releaseDate' => $game->releaseDate,
                'synopsis' => $game->synopsis,
                'image_url' => $game->image_url,
                'created_at' => $game->created_at,
                'updated_at' => $game->updated_at,
                'statusCompleted' => $game->pivot->statusCompleted,
                'onList' => $game->pivot->onList
            ];
    
            // Agregar los datos del juego al array de juegos del usuario
            $allGames[] = $gameData;
        }
    
        // Devolver todos los juegos del usuario en formato JSON
        return response()->json($allGames);
    }
    
    //Borra al usuario con sus relaciones a la tabla pivote
    public function destroy($id)
    {
        // Buscar el usuario por su ID
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }
    
        try {
            // Eliminar las relaciones en la tabla pivote
            $user->games()->detach();
    
            // Eliminar el usuario
            $user->delete();
    
            return response()->json(['message' => 'Usuario y relaciones eliminadas con éxito.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el usuario.'], 500);
        }
    }
    


    //Esta función muestra los juegos que tiene un usuario x
    public function games(Request $request){
        //Para el user que queramos ver
        $user= User::find($request->user_id);
        // Verificar si el usuario existe
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        // Obtener los juegos asociados al usuario a través de la tabla pivote user_game_lists
        $games = $user->games()->withPivot('statusCompleted')->get();
        $data= [
            //'message'=> 'Games successfully retrieved for user',
            'game'=> $games
        ];
        return response()-> json($data);
    }

}
