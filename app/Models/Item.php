<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'meta' => 'array',
        'track_tree' => 'array',
        'activities' => 'array'
    ];

    public function user()
    {
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

    public function loadChildren()
    {
        $children = Item::whereParentId($this->id)->get();
        return $children;
    }

    public function getRouteKeyName()
    {
        return 'reference';
    }

    public function loadParents()
    {
        $parentItems = collect(is_array($this->track_tree) ? $this->track_tree : ['index']);
        $parentsKeys = collect($parentItems)->filter(function ($item) {
            return $item !== 'index' && $item !== $this->reference;
        })->flatten()->toArray();

        $parents = Item::whereIn('reference', $parentsKeys)->get(['id', 'name', 'reference']);
        return $parents;
        
    }
}