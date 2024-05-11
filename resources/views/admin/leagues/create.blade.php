@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Add League</h1>
    <form action="{{ route('leagues.store') }}" method="POST">
        @csrf
        @include('admin.leagues.partials._form')
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
@endsection
