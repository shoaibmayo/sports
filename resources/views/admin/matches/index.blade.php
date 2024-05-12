@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Matches</h1>
    <a href="{{ route('matches.create') }}" class="btn btn-primary mb-2">Add Match</a>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Team 1</th>
                <th>Team 2</th>
                <th>League</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($matches as $match)
            <tr>
                <td>{{ $match->id }}</td>
                <td>{{ $match->date }}</td>
                <td>{{ $match->time }}</td>
                <td>{{ $match->team1->name }}</td>
                <td>{{ $match->team2->name }}</td>
                <td>{{ $match->league->s_name ?? 'N/A' }}</td>
                <td>
                    <a href="{{ route('matches.edit', $match->id) }}" class="btn btn-sm btn-warning">Edit</a>
                    <form action="{{ route('matches.destroy', $match->id) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
