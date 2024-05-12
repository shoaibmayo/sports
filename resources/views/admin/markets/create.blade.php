@extends('layouts.simple.master')

@section('content')
    <h1>Create New Market</h1>

    <form action="{{ route('markets.store' , $matche_id) }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>
        <div class="form-group" style="display:none;">
            <label for="matche_id">Match ID</label>
            <input type="number" name="matche_id" value="{{$matche_id}}" id="matche_id" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Create Market</button>
    </form>
@endsection
