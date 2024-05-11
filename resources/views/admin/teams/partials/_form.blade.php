<div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" value="{{ old('name') ?? $team->name ?? '' }}">
</div>
<div class="mb-3">
    <label for="league_id" class="form-label">League</label>
    <select class="form-select" id="league_id" name="league_id">
        @foreach ($leagues as $league)
            <option value="{{ $league->id }}" {{ isset($team) && $team->league_id == $league->id ? 'selected' : '' }}>{{ $league->s_name }}</option>
        @endforeach
    </select>
</div>
<div class="mb-3">
    <label for="img" class="form-label">Image</label>
    <input type="file" class="form-control" id="img" name="img">
</div>
