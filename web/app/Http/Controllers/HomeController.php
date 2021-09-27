<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HomeController extends Controller
{

    /**
     * @return Response
     */
    public function index(): Response
    {
        $post = Post::with(['user', 'comments'])->orderBy('id', 'DESC')->get(['id', 'content', 'user_id']);
        return \response()->view('home', compact('post'));
    }

}
