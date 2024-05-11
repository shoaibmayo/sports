@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Edit Match</h1>
    <form action="{{ route('matches.update', $match->id) }}" method="POST">
        @csrf
        @method('PUT')
        @include('admin.matches.partials._form')
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
