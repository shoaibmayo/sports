<?php

namespace App\Http\Controllers\Admin;

use App\Models\Team;
use App\Models\League;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();
        return view('admin.teams.index', compact('teams'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $leagues = League::all();
        
        return view('admin.teams.create', compact('leagues'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'league_id' => 'required|exists:leagues,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $teamData = $request->only('name', 'league_id');

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $imageName = $image->getClientOriginalName();
            $imagePath = $image->storeAs('teams', $imageName, 'public');
            $teamData['img'] = $imagePath;
        }

        Team::create($teamData);

        return redirect()->route('teams.index')->with('success', 'Team created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $team = Team::findOrFail($id);
        $leagues = League::all();
        return view('admin.teams.edit', compact('team', 'leagues'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'league_id' => 'required|exists:leagues,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $team = Team::findOrFail($id);
        $teamData = $request->only('name', 'league_id');

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $imageName = $image->getClientOriginalName();
            $imagePath = $image->storeAs('teams', $imageName, 'public');
            $teamData['img'] = $imagePath;
        }

        $team->update($teamData);

        return redirect()->route('teams.index')->with('success', 'Team updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();
        
        // Optionally, you can delete the associated image file if it exists
        if ($team->img) {
            Storage::disk('public')->delete($team->img);
        }

        return redirect()->route('teams.index')->with('success', 'Team deleted successfully.');
    }
}
