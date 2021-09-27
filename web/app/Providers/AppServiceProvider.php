<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Model::unguard();

        \Response::macro('success', function (object|array $data, int $statusCode = 200) {
            return returnSuccess($data, $statusCode);
        });

        \Response::macro('fail', function (object|array $errorMsg, int $statusCode = 200) {
           return returnFail($errorMsg, $statusCode);
        });
    }
}
