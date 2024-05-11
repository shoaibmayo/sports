@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Add Team</h1>
    <form action="{{ route('teams.store') }}" method="POST">
        @csrf
        @include('admin.teams.partials._form')
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
@endsection
