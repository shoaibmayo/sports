<div class="mb-3">
    <label for="sport_id" class="form-label">Sport</label>
    <select class="form-select" id="sport_id" name="sport_id">
        @foreach ($sports as $sport)
            <option value="{{ $sport->id }}" {{ isset($league) && $sport->id == $league->sport_id ? 'selected' : '' }}>{{ $sport->name }}</option>
        @endforeach
    </select>
</div>
<div class="mb-3">
    <label for="s_name" class="form-label">Short Name</label>
    <input type="text" class="form-control" id="s_name" name="s_name" value="{{ old('s_name') ?? (isset($league) ? $league->s_name : '') }}">
</div>
<div class="mb-3">
    <label for="long_name" class="form-label">Long Name</label>
    <input type="text" class="form-control" id="long_name" name="long_name" value="{{ old('long_name') ?? (isset($league) ? $league->long_name : '') }}">
</div>
<div class="mb-3">
    <label for="img" class="form-label">Image</label>
    <input type="file" class="form-control" id="img" name="img">
</div>
