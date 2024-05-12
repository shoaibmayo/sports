@extends('layouts.simple.master')

@section('content')
    <h1>Edit Market</h1>

    <form action="{{ route('markets.update', $market->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $market->name }}" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Market</button>
    </form>
@endsection
