<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use App\Models\League;
use Illuminate\Http\Request;

class GetSportsForPage extends Controller
{
    public function index($id = 0,$lid=0){
        if($id==0){
            $sp = Sport::first();
        }else{
            $sp = Sport::find($id);
        }
        if($lid==0){
            $lp = League::where('sport_id',$sp->id)->first();
        }else{
            $lp = League::find($lid);
        }
        // $sports = Sport::with('leagues.matches')->get();
        $sports = Sport::with(['leagues.matches', 'leagues.matches.team1', 'leagues.matches.team2'])->get();


        // dd($sports[0]->leagues[0]->matches[0]);

        return view('web.index', compact('sp', 'lp' ,'sports'));

       
    }
}
