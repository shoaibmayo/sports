<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Betslip extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function marketdetail()
    {
        return $this->belongsTo(MarketDetail::class,'marketdetail_id');
    }
}
