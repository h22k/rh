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

        if (!\Auth::attempt($credentials, true)) {
            return redirect()->back()->with('alert', 'Email or password wrong!');
        }

        $response = \Http::post('http://localhost:3000/auth/login', [
            'email' => auth()->user()->email,
            'password' => auth()->user()->password
        ]);



        $data = $response->json();
        if ( ! $data['status']) {
            return redirect()->back()->with('alert', 'Something wrong.');
        }

        $id = auth()->user()->id;
        \Cache::set("user-$id", $data['data']['token']);

        session()->flash('alert', 'Welcome! You logged in.');
        return redirect(route('home.home'));
    }

    public function checkLogin(LoginRequest $request)
    {

        $credentials = $request->only(['email', 'password']);

        if (!\Auth::attempt($credentials, true)) {
            return \response()->fail([
                'msg' => 'E-mail or password is wrong! '
            ]);
        }

        return \response()->success([
            'msg' => 'You logged in.',
            'route' => route('login.login')
        ]);

    }

}
