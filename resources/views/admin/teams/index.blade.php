@extends('web.layouts.master')

@section('content')
<div class="container">
    <h1>Teams</h1>
    <a href="{{ route('teams.create') }}" class="btn btn-primary mb-2">Add Team</a>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>League</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($teams as $team)
            <tr>
                <td>{{ $team->id }}</td>
                <td>{{ $team->name }}</td>
                <td>{{ $team->league->s_name }}</td>
                <td>{{ $team->img }}</td>
                <td>
                    <a href="{{ route('teams.edit', $team->id) }}" class="btn btn-sm btn-warning">Edit</a>
                    <form action="{{ route('teams.destroy', $team->id) }}" method="POST" style="display: inline;">
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
