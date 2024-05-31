<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*API soporta x peticiones por minuto (Configurado en kernel.php y RouteServiceProvider) */
Route::middleware('api')->group(function () {

    //Funciones de CategoryController
    Route::get('/categories', 'App\Http\Controllers\CategoryController@index');
    Route::post('/categories', 'App\Http\Controllers\CategoryController@store');
    Route::get('/categories/{category}', 'App\Http\Controllers\CategoryController@show');
    Route::put('/categories/{category}', 'App\Http\Controllers\CategoryController@update');
    Route::delete('/categories/{category}', 'App\Http\Controllers\CategoryController@destroy');


    

    //Funciones de GameController
    Route::get('/games', 'App\Http\Controllers\GameController@index');
    Route::get('/allgames', 'App\Http\Controllers\GameController@indexAllGames');
    Route::get('/games/{game}', 'App\Http\Controllers\GameController@show');

    //Funciones de UserController
    Route::get('/allUsers', 'App\Http\Controllers\UserController@allUsers');
    Route::get('/users', 'App\Http\Controllers\UserController@index');
    Route::get('/users/{user}', 'App\Http\Controllers\UserController@show');


    Route::get('/user_game_lists', 'App\Http\Controllers\UserGameListsController@index');


    //Rutas para enlazar games a users o categories
    Route::post('/games/user', 'App\Http\Controllers\GameController@attach');
    Route::post('/games/user/detach', 'App\Http\Controllers\GameController@detach');
    Route::post('/games/category', 'App\Http\Controllers\GameController@attachCategory');



    //Ruta para ver qué games tienen x user
    Route::post('/users/games', 'App\Http\Controllers\UserController@games');

    //Rutas Auth
    Route::post('/register', 'App\Http\Controllers\AuthController@register');
    Route::post('/login', 'App\Http\Controllers\AuthController@login');



    /*Las rutas que estén dentro del middleware necesitan que se les pase
    un token de acceso*/
    Route::middleware('auth:sanctum')->group(function () {
        
        /*GameController*/
        Route::post('/games', 'App\Http\Controllers\GameController@store');
        Route::put('/games/{game}', 'App\Http\Controllers\GameController@update');
        Route::delete('/games/{game}', 'App\Http\Controllers\GameController@destroy');

        /*UserController*/
        Route::put('/users/{user}', 'App\Http\Controllers\UserController@update');

        /*Actualización de estados, para juegos de un usuario o categorias*/
        Route::put('/games/onList/{game}', 'App\Http\Controllers\GameController@updateOnList');
        Route::put('/games/statusCompleted/{game}', 'App\Http\Controllers\GameController@updateStatusCompleted');
        Route::put('/games/onCategory/{game}', 'App\Http\Controllers\GameController@updateOnCategory');

        /*Eliminar un usuario, con sus relaciones a la tabla pivote */
        Route::delete('/user/{id}', 'App\Http\Controllers\UserController@destroy');


        //Logout
        Route::get('/logout', 'App\Http\Controllers\AuthController@logout');
    });
});