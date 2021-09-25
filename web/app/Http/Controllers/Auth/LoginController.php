<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoginController extends Controller
{

    /**
     * Login view.
     *
     * @return Response
     */
    public function show(): Response
    {
        return response()->view('auth.login');
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->only(['email', 'password']);

        if (\Auth::attempt($credentials, $request->post('remember_me'))) {
            return redirect(route('home.index'));
        }

        return redirect()->back()->with('alert', 'E-mail or password is wrong.');

    }

}
