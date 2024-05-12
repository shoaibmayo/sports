<?php

namespace App\Http\Controllers\Admin;

use App\Models\Sport;
use App\Models\League;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LeagueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $leagues = League::all();
        return view('admin.leagues.index', compact('leagues'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sports = Sport::all();
        return view('admin.leagues.create', compact('sports'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            's_name' => 'required|string|max:255',
            'long_name' => 'required|string|max:255',
            'sport_id' => 'required|exists:sports,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);
    
        $leagueData = $request->only('s_name', 'long_name', 'sport_id');
    
        // Handle image upload
        if ($request->hasFile('img')) {
            $imageName = time().'.'.$request->img->extension();
            $request->img->move(public_path('images'), $imageName);
            $imagePath = '/images/'.$imageName;
            // $image = $request->file('img');
            // $imageName = $image->getClientOriginalName();
            // $imagePath = $image->storeAs('leagues', $imageName, 'public');
            $leagueData['img'] = $imagePath;
        }
        
        League::create($leagueData);
    
        return redirect()->route('leagues.index')->with('success', 'League created successfully.');
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
        $league = League::findOrFail($id);
        $sports = Sport::all();
        return view('admin.leagues.edit', compact('league', 'sports'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            's_name' => 'required|string|max:255',
            'long_name' => 'required|string|max:255',
            'sport_id' => 'required|exists:sports,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);

        $league = League::findOrFail($id);
        $leagueData = $request->only('s_name', 'long_name', 'sport_id');

        // Handle image upload
        if ($request->hasFile('img')) {
            $imageName = time().'.'.$request->img->extension();
            $request->img->move(public_path('images'), $imageName);
            $imagePath = '/images/'.$imageName;
            // $image = $request->file('img');
            // $imageName = $image->getClientOriginalName();
            // $imagePath = $image->storeAs('leagues', $imageName, 'public');
            $leagueData['img'] = $imagePath;
        }

        $league->update($leagueData);

        return redirect()->route('leagues.index')->with('success', 'League updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $league = League::findOrFail($id);
        $league->delete();

        return redirect()->route('leagues.index')->with('success', 'League deleted successfully.');
    }
}
