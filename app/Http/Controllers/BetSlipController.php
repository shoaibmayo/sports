<?php

namespace App\Http\Controllers;

use App\Models\Betslip;
use App\Models\MarketDetail;
use Illuminate\Http\Request;

class BetSlipController extends Controller
{
    public function addOdds(Request $request){
       
        $marketDetail = MarketDetail::with('market','market.matche','market.matche.team1','market.matche.team1')->find($request->id);
       
        if($marketDetail){
            Betslip::create([
                'matche_id' => $marketDetail->market->matche->id,
                'marketdetail_id' => $marketDetail->id,
                'user_id' =>0
            ]);
                           
            
             
            //  $response = ['status'=>'success','data'=>$data];
             return response()->json(['status'=>'success','data'=>$this->getData(0)]);
        }
        return response()->json(['status'=>'fail','data'=>[]]);
      
        // dd($marketDetail->market->matche->team1);
    }
    public function removeOdds(Request $request){
        $marketDetail = MarketDetail::find($request->id);
        if($marketDetail){
            Betslip::where('marketdetail_id', $marketDetail->id)
                    ->where('user_id', 0)
                    ->delete();
            return response()->json(['status'=>'success','data'=>$this->getData(0)]);         
        }
        return response()->json(['status'=>'fail','data'=>[]]); 
    }
    public function getData($id){
        $data1 = array();
                $slips = Betslip::with(
                    'marketdetail',
                    'marketdetail.market',
                    'marketdetail.market.matche',
                    'marketdetail.market.matche.team1',
                    'marketdetail.market.matche.team2'
                )
            ->where('user_id',$id)->get();

            foreach($slips as $slip){
                $data1 [] = [
                'option_id' => $slip->marketDetail->id,
                'option_odds' => $slip->marketDetail->rate,
                'team' => $slip->marketDetail->market->matche->team1->name.' Vs '.$slip->marketDetail->market->matche->team2->name,
                'question' => $slip->marketDetail->market->name,
                'match' => $slip->marketDetail->name
                ];
            } 
         return $data1;    
    }

    public function removeAllOdds(){
        $id = 0;
        Betslip::where('user_id', $id)->delete();
        return response()->json(['status'=>'success','data'=>$this->getData(0)]);
    }

}
