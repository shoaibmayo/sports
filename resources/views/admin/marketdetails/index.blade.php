@extends('layouts.simple.master')

@section('content')
    <h1>Market Details</h1>
    <h5 class="text-center m-4 text-warning">
        {{$market->name .' for '. $market->matche->team1->name .' Vs '. $market->matche->team2->name}}
    </h5>
    <a href="{{ route('market-details.create', $market->id) }}" class="btn btn-primary">Create New Market Detail</a>

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Rate</th>
                <th>Market</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($marketDetails as $marketDetail)
                <tr>
                    <td>{{ $marketDetail->id }}</td>
                    <td>{{ $marketDetail->name }}</td>
                    <td>{{ $marketDetail->rate }}</td>
                    <td>{{ $market->name }}</td>
                    <td>
                        
                        <a href="{{ route('market-details.edit', $marketDetail->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('market-details.destroy', $marketDetail->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
