@extends('layouts.simple.master')

@section('content')
    <h1>Edit Market Detail</h1>

    <form action="{{ route('market-details.update', $marketDetail->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $marketDetail->name }}" required>
        </div>
        <div class="form-group">
            <label for="rate">Rate</label>
            <input type="float" name="rate" id="rate" class="form-control" value="{{ $marketDetail->rate }}" required>
        </div>
        <div class="form-group" style="display:none;">
            <label for="market_id">Market ID</label>
            <input type="number" name="market_id" id="market_id" class="form-control" value="{{ $marketDetail->market_id }}" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Market Detail</button>
    </form>
@endsection
