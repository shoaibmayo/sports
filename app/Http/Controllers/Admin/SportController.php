<?php

namespace App\Http\Controllers\Admin;

use App\Models\Sport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sports = Sport::all();
        return view('admin.sports.index', compact('sports'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.sports.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:sports,name',
            'icon' => 'nullable|string|max:255' // Validation for the icon field
        ]);

        Sport::create($request->only('name', 'icon'));

        return redirect()->route('sports.index')->with('success', 'Sport created successfully.');
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
    public function edit(string $id)
    {
        $sport = Sport::findOrFail($id);
        return view('admin.sports.edit', compact('sport'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:sports,name,' . $id,
            'icon' => 'nullable|string|max:255' // Validation for the icon field
        ]);

        $sport = Sport::findOrFail($id);
        $sport->update($request->only('name', 'icon'));

        return redirect()->route('sports.index')->with('success', 'Sport updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sport = Sport::findOrFail($id);
        $sport->delete();
    
        return redirect()->route('sports.index')->with('success', 'Sport deleted successfully.');
    }
}
