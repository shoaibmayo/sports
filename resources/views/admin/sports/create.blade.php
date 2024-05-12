@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Add Sport</h1>
    <form action="{{ route('sports.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
        </div>
        <div class="mb-3">
            <label for="icon" class="form-label">Icon</label>
            <input type="text" class="form-control" id="icon" name="icon" value="{{ old('icon') }}">
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
@endsection
