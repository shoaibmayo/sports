@extends('layouts.simple.master')

@section('content')
<div class="container">
    <h1>Edit League</h1>
    <form action="{{ route('leagues.update', $league->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
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
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
