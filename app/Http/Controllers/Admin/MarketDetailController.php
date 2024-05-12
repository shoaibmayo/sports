<?php

namespace App\Http\Controllers\Admin;

use App\Models\Market;
use App\Models\MarketDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarketDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $marketDetails = MarketDetail::where('market_id', $id)->get();

        $market = Market::with(['matche','matche.team1','matche.team2'])->find($id);
        // dd($market->matche->team1);
        return view('admin.marketdetails.index', compact('marketDetails','market'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $market = Market::with(['matche','matche.team1','matche.team2'])->find($id);
        return view('admin.marketdetails.create',compact('market'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'rate' => 'required|numeric',
            'market_id' => 'required|exists:markets,id'
        ]);

        MarketDetail::create($request->all());

        return redirect()->route('market-details.index', $request->market_id)->with('success', 'Market Detail created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(MarketDetail $marketDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($marketdetail)
    {
        $marketDetail = MarketDetail::find($marketdetail);
        return view('admin.marketdetails.edit', compact('marketDetail'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$marketdetail)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'rate' => 'required|numeric',
            'market_id' => 'required|exists:markets,id'
        ]);
        $marketDetail = MarketDetail::find($marketdetail);
        $marketDetail->update($request->all());

        return redirect()->route('market-details.index', $request->market_id)->with('success', 'Market Detail updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($marketdetail)
    {
        $marketDetail = MarketDetail::find($marketdetail);
        $market = $marketDetail->market_id;
        $marketDetail->delete();

        return redirect()->route('market-details.index', $market)->with('success', 'Market Detail deleted successfully');
    }
}
