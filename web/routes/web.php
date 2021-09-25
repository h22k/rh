<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\HomeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('/')->group(static function() {
    //Auth
    Route::get('/', function () {
       return redirect(\route('login.view'));
    });
    Route::prefix('/auth')->middleware('guest')->group(static function() {

        Route::get('/login', [LoginController::class, 'show'])
            ->name('login.view');

        Route::post('/login', [LoginController::class, '']);


    });

    Route::prefix('/home')->name('home.')->middleware('auth')->group(static function() {

        Route::get('/', [HomeController::class, 'index'])->name('index');

    });
});
