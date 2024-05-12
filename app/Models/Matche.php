<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function team1()
    {
        return $this->belongsTo(Team::class, 'team1_id');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'team2_id');
    }
    public function leagues()
    {
        return $this->belongsTo(League::class);
    }
    public function league()
{
    return $this->belongsTo(League::class, 'league_id');
}
}
