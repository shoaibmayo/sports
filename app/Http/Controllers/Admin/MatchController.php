<?php

namespace App\Http\Controllers\Admin;

use App\Models\Team;
use App\Models\League;
use App\Models\Matche;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = Matche::all();
        return view('admin.matches.index', compact('matches'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teams = Team::all();
        $leagues = League::all();
        return view('admin.matches.create', compact('teams', 'leagues'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'team1_id' => 'required|exists:teams,id',
            'team2_id' => 'required|exists:teams,id|different:team1_id',
            'league_id' => 'required|exists:leagues,id',
        ]);

        Matche::create($request->all());

        return redirect()->route('matches.index')->with('success', 'Match created successfully.');
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
        $match = Matche::findOrFail($id);
        $teams = Team::all();
        $leagues = League::all();
        return view('admin.matches.edit', compact('match', 'teams', 'leagues'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'team1_id' => 'required|exists:teams,id',
            'team2_id' => 'required|exists:teams,id|different:team1_id',
            'league_id' => 'required|exists:leagues,id',
        ]);

        $match = Matche::findOrFail($id);
        $match->update($request->all());

        return redirect()->route('matches.index')->with('success', 'Match updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Matche::findOrFail($id)->delete();
        return redirect()->route('matches.index')->with('success', 'Match deleted successfully.');
    }

}
