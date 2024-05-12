<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function matche()
    {
        return $this->belongsTo(Matche::class, 'matche_id');
    }
    public function marketdetails()
    {
        return $this->hasMany(MarketDetail::class);
    }
}
