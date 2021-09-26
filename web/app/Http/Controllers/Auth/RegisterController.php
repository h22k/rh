<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    /**
     * Register view.
     *
     * @return Response
     */
    public function show(): Response
    {
        return response()->view('auth.register');
    }

    public function register(RegisterRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        $extraFields = [
          'remember_token' =>  \Str::random(50)
        ];
        $user = User::create(array_merge($credentials, $extraFields));

        if ( ! $user) {
            return \response()->fail([
                'msg' => 'Database error. Try again'
            ]);
        }

        return \response()->success([
           'msg' => 'User created. Welcome.',
           'user' => array_merge((array) $user->getOriginal())
        ]);
    }
}
