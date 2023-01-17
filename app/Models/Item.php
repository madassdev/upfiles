<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $casts = ['meta' => 'array'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function children()
    {
        return $this->hasMany(Item::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Item::class, 'parent_id');
    }
}
