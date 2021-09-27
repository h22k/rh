@extends('layouts.app')

@section('content')
<div class="container">
    <home-component user="{{auth()->user()->id}}" post="{{json_encode($post->toArray())}}"></home-component>
</div>
@endsection
