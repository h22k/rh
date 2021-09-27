<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Cookie;

class PostController extends Controller
{
    public function create(PostRequest $request)
    {

        $post = Post::create($request->all());
        $id = $request->post('user_id');

        $req = \Http::withHeaders([
            'x-access-token' => \Cache::get("user-$id")
        ])->post('http://localhost:3000/post/create', ['content' => $post->content, 'user_id' => $post->user_id]);

        if ( ! $req->json()['status']) {
            return response()->fail([
                'msg' => 'Could not created post!'
            ]);
        }

        return response()->success([
            'msg' => 'Post created!'
        ]);

    }

    public function all()
    {
        $posts = Post::with(['user', 'comments'])->orderBy('id', 'DESC')->get(['id', 'user_id', 'content']);
        return response()->success([
            'data' => $posts
        ]);
    }
}
