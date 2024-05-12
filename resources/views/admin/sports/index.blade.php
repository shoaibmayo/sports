@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Sports</h1>
    <a href="{{ route('sports.create') }}" class="btn btn-primary mb-2">Add Sport</a>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Icon</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($sports as $sport)
            <tr>
                <td>{{ $sport->id }}</td>
                <td>{{ $sport->name }}</td>
                <td>{{ $sport->icon }}</td>
                <td>
                    <a href="{{ route('sports.edit', $sport->id) }}" class="btn btn-sm btn-warning">Edit</a>
                    <form action="{{ route('sports.destroy', $sport->id) }}" method="POST" style="display: inline;">
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
