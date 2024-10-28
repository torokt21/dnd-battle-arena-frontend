<?php

namespace App\Http\Controllers;

use App\Models\BattleEntity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BattleEntityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'battle_id' => 'required|integer|exists:battles,id',
            'entity_id' => 'required|integer|exists:entities,id',
        ];

        // Validate request and return errors
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        return BattleEntity::placeFirstEmpty($validated['battle_id'], $validated['entity_id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(BattleEntity $battleEntity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BattleEntity $battleEntity)
    {
        $rules = [
            'x' => 'required|integer',
            'y' => 'required|integer',
        ];

        // Validate request and return errors
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $battleEntity->x = $validated['x'];
        $battleEntity->y = $validated['y'];
        $battleEntity->save();
        return $battleEntity;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BattleEntity $battleEntity)
    {
        //
    }
}
