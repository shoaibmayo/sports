@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Add Match</h1>
    <form action="{{ route('matches.store') }}" method="POST">
        @csrf
        @include('admin.matches.partials._form')
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
@endsection
