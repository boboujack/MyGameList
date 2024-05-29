<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/redis-test', function () {
    Cache::store('redis')->put('test_key', 'test_value', 10);

    if (Cache::store('redis')->has('test_key')) {
        return 'Redis is working!';
    } else {
        return 'Redis is not working!';
    }
});