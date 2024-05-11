@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Edit Team</h1>
    <form action="{{ route('teams.update', $team->id) }}" method="POST">
        @csrf
        @method('PUT')
        @include('admin.teams.partials._form')
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
