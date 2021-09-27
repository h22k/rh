<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PostController;

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

Route::prefix('/auth')->name('api.')->group(static function() {

    Route::post('/login', [LoginController::class, 'checkLogin'])->name('login');
    ////////////
    Route::post('/register', [RegisterController::class, 'register'])->name('register');

});

Route::prefix('post')->name('post.')->group(static function() {

    Route::get('/', [PostController::class, 'all'])->name('all');

    Route::post('/create', [PostController::class, 'create'])->name('create');

});
