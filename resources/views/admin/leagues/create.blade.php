@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Add League</h1>
    <form action="{{ route('leagues.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        @include('admin.leagues.partials._form')
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
@endsection
