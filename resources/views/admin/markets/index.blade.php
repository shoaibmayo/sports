@extends('layouts.simple.master')

@section('content')
    <h1>Markets</h1>
    <a href="{{ route('markets.create', $matche_id) }}" class="btn btn-primary">Create New Market</a>

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Match</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($markets as $market)
                <tr>
                    <td>{{ $market->id }}</td>
                    <td>{{ $market->name }}</td>
                    <td>{{ $market->matche->team1->name .' Vs '. $market->matche->team2->name}}</td>
                    <td>
                        
                        <a href="{{ route('markets.edit', $market->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('markets.destroy', $market->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                        <a href="{{ route('market-details.index', $market->id) }}" class="btn btn-sm btn-success">Bet System</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
