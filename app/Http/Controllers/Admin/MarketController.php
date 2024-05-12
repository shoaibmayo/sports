<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Market;
use Illuminate\Http\Request;

class MarketController extends Controller
{
    public function index($id)
    {
        $markets = Market::with(['matche','matche.team1','matche.team2'])->where('matche_id',$id)->get();
        // dd($markets[0]->matche->team1);
        $matche_id = $id;
        return view('admin.markets.index', compact('markets','matche_id'));
    }

    public function create($id)
    {
        $matche_id = $id;
        return view('admin.markets.create', compact('matche_id'));
    }

    public function store(Request $request,$id)
    {
        // Validation logic

        Market::create($request->all());

        return redirect()->route('markets.index',$id)->with('success', 'Market created successfully');
    }

    public function show(Market $market)
    {
        return view('markets.show', compact('market'));
    }

    public function edit(Market $market)
    {
        return view('admin.markets.edit', compact('market'));
    }

    public function update(Request $request, Market $market)
    {
        // Validation logic

        $market->update($request->all());

        return redirect()->route('markets.index',$market->matche_id)->with('success', 'Market updated successfully');
    }

    public function destroy(Market $market)
    {
        $mid = $market->matche_id;
        $market->delete();

        return redirect()->route('markets.index',$mid)->with('success', 'Market deleted successfully');
    }
}
