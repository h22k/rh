<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
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

Route::prefix('/')->group(static function () {

    //Redirect login if you are not logged.
    Route::get('/', function () {
        return redirect(\route('login.view'));
    });

    Route::post('/logout', function () {
        auth()->logout();
        return redirect(\route('login.view'));
    })->middleware('auth')->name('logout');

    //Auth stuff.
    Route::prefix('/auth')->group(static function () {
        //Login
        Route::prefix('/login')->middleware('guest')->name('login.')->group(static function () {

                Route::get('/', [LoginController::class, 'show'])
                    ->name('view');

                Route::post('/', [LoginController::class, 'login'])->name('login');
            });

        //Register
        Route::prefix('/register')->name('register.')
            ->middleware('guest')->group(static function () {

                Route::get('/', [RegisterController::class, 'show'])->name('view');

            });



    });

    Route::prefix('/home')->middleware('auth')->name('home.')->group(static function () {

        Route::get('/', [HomeController::class, 'index'])->name('home');

    });
});
