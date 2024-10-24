<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Http\Requests\StoreBattleRequest;
use App\Http\Requests\UpdateBattleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BattleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Battle::orderBy('updated_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'scene_id' => 'required|integer',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ];
        // Validate request and return errors
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();
        $battle = Battle::create($validated);
        return response()->json($battle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Battle $battle)
    {
        return response()->json($battle, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Battle $battle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Battle $battle)
    {
        //
    }
}
