@extends('layouts.simple.master')

@section('content')
    <h1>Create New Market Detail</h1>
    <h5 class="text-center m-4 text-warning">
        {{$market->name .' for '. $market->matche->team1->name .' Vs '. $market->matche->team2->name}}
    </h5>
    <form action="{{ route('market-details.store', $market->id) }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="rate">Rate</label>
            <input type="float" name="rate" id="rate" class="form-control" required>
        </div>
        <div class="form-group" style="display:none;">
            <label for="market_id">Market ID</label>
            <input type="number" name="market_id" value="{{$market->id}}" id="market_id" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Create Market Detail</button>
    </form>
@endsection
