<div class="mb-3">
    <label for="date" class="form-label">Date</label>
    <input type="date" class="form-control" id="date" name="date" value="{{ old('date') ?? $match->date ?? '' }}">
</div>
<div class="mb-3">
    <label for="time" class="form-label">Time</label>
    <input type="time" class="form-control" id="time" name="time" value="{{ old('time') ?? $match->time ?? '' }}">
</div>
<div class="mb-3">
    <label for="team1_id" class="form-label">Team 1</label>
    <select class="form-select" id="team1_id" name="team1_id">
        @foreach ($teams as $team)
            <option value="{{ $team->id }}" {{ isset($match) && $match->team1_id == $team->id ? 'selected' : '' }}>{{ $team->name }}</option>
        @endforeach
    </select>
</div>
<div class="mb-3">
    <label for="team2_id" class="form-label">Team 2</label>
    <select class="form-select" id="team2_id" name="team2_id">
        @foreach ($teams as $team)
            <option value="{{ $team->id }}" {{ isset($match) && $match->team2_id == $team->id ? 'selected' : '' }}>{{ $team->name }}</option>
        @endforeach
    </select>
</div>
<div class="mb-3">
    <label for="league_id" class="form-label">League</label>
    <select class="form-select" id="league_id" name="league_id">
        @foreach ($leagues as $league)
            <option value="{{ $league->id }}" {{ isset($match) && $match->league_id == $league->id ? 'selected' : '' }}>{{ $league->s_name }}</option>
        @endforeach
    </select>
</div>
