<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    //
    public function index()
    {
        $user = auth()->user();
        $summary = [
            "files" => ["total" => 0],
        ];
        $items = Item::whereUserId($user->id)->whereNull('parent_id')->get();
        return inertia('Items/Index', compact('summary', 'items'));
    }

    public function show(Item $item)
    {

        $parents = $item->loadParents();
        $items = $item->loadChildren();
        return inertia('Items/Show', compact('item', 'items', 'parents'));
    }


    public function create(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "type" => "required|in:file,folder",
            "name" => "required_if:type,folder|string|min:1|max:50",
            "parent_id" => "required|sometimes|numeric"
        ]);

        if ($request->parent_id) {
            $parent = Item::whereUserId($user->id)->whereId($request->parent_id)->first();
            if (!$parent) {
                return back()->withErrors("Parent folder not found or does not belong to user");
            }
        }
        if ($request->type == 'folder') {
            // if(){}
            $reference = strtoupper(str()->random(24));
            $item = new Item();
            $item->user_id = $user->id;
            $item->parent_id = $request->parent_id;

            $item->name = $request->name;
            $item->type = 'folder';
            $item->reference = $reference;
            $tree = @$parent->track_tree ?? ['index'];
            $tree[] = $reference;
            $item->track_tree = $tree;
            $item->meta = [
                "name" => $request->name,
                "items" => ["files" => 0, "folders" => 0],
                "created" => now(),
                "modified" => now(),
            ];

            $item->save();
        }

        return back()->with('shared', [
            "data" => ["item" => $item],
            "message" => "Created successfully"
        ]);
        return back()->withSuccess('Created successfully');
    }

    public function rename(Item $item, Request $request)
    {
        $oldName = $item->name;
        $item->name = $request->new_name ?? $oldName;
        $item->save();
        $itemActivity = $item->activities ?? [];
        $activity = [
            'type' => 'rename',
            'payload' => [
                'from' => $oldName,
                'to' => $oldName,
            ],
            'done_at' => now()
        ];

        $item->activities = collect($itemActivity)->push($activity);

        return back()->with('shared', [
            "data" => ["item" => $item],
            "message" => "Renamed successfully"
        ]);
    }

    public function moveItems(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*' => 'required|string|exists:items,reference',
            'destination' => 'required|string|exists:items,reference',
        ]);

        $destinationItem = Item::where('reference', $request->destination)->firstOrFail();


        $items = Item::whereIn('reference', $request->items)->get()->map(function ($item) use ($destinationItem) {
            $reference = strtoupper(str()->random(24));
            $item->reference = $reference;
            $item->parent_id = $destinationItem->id;
            $item->track_tree = collect($destinationItem->track_tree)->push($destinationItem->reference);
            $item->save();
        });

        return back()->with('shared', [
            "data" => ["items" => $items],
            "message" => "Moved successfully"
        ]); 
    }
    public function copyItems(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*' => 'required|string|exists:items,reference',
            'destination' => 'required|string|exists:items,reference',
        ]);

        $destinationItem = Item::where('reference', $request->destination)->firstOrFail();


        $items = Item::whereIn('reference', $request->items)->get()->map(function ($item) use ($destinationItem) {
            $reference = strtoupper(str()->random(24));
            $newItem = $item->replicate();
            $newItem->created_at = now();
            $newItem->reference = $reference;
            $newItem->parent_id = $destinationItem->id;
            $newItem->track_tree = collect($destinationItem->track_tree)->push($destinationItem->reference);
            $newItem->save();
        });

        return back()->with('shared', [
            "data" => ["items" => $items],
            "message" => "Copied successfully"
        ]); 
    }
}