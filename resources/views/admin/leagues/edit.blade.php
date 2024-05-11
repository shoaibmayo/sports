@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Edit League</h1>
    <form action="{{ route('leagues.update', $league->id) }}" method="POST">
        @csrf
        @method('PUT')
        @include('admin.leagues.partials._form')
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
