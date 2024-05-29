<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use App\Models\Game;
use \stdClass;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:4'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    // Crear el nuevo usuario
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
    ]);

    // Obtener todos los juegos
    $games = Game::all();

    // Asignar todos los juegos al nuevo usuario con onList como 0 o false
    foreach ($games as $game) {
        $user->games()->attach($game->id, ['onList' => false]);
    }

    // Crear el token de acceso para el nuevo usuario
    $token = $user->createToken('auth_token')->plainTextToken;

    // Devolver la respuesta JSON
    return response()->json([
        'data' => $user->only(['id', 'name', 'email']), // Excluir la contraseña
        'access_token' => $token,
        'token_type' => 'Bearer'
    ]);
}

    public function login (Request $request){
        /*Si los credenciales no son correctos devolvemos Unauthorized */
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['message' => 'Unauthorized'], 481);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        // Crear el token de acceso con un tiempo de expiración de 7 días
        $token = $user->createToken('auth_token', ['expires_in' => 60 * 24 * 7])->plainTextToken;

        return response()->json([
            'message' => 'Hi ' . $user->name, // Añadida una clave para el mensaje
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function logout (){
        //Borramos todos los tokens del user autenticado
        auth()->user()->tokens ()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }
}
