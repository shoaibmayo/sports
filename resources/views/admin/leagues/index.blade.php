@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Leagues</h1>
    <a href="{{ route('leagues.create') }}" class="btn btn-primary mb-2">Add League</a>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Sport</th>
                <th>Short Name</th>
                <th>Long Name</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($leagues as $league)
            <tr>
                <td>{{ $loop->iteration++ }}</td>
                <td>{{ $league->sport->name }}</td>
                <td>{{ $league->s_name }}</td>
                <td>{{ $league->long_name }}</td>
                <td><img src="{{ asset($league->img) }}" width="30px" height="30px" alt=""></td>
                <td>
                    <a href="{{ route('leagues.edit', $league->id) }}" class="btn btn-sm btn-warning">Edit</a>
                    <form action="{{ route('leagues.destroy', $league->id) }}" method="POST" style="display: inline;">
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
