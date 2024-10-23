<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use App\Http\Requests\StoreEntityRequest;
use App\Http\Requests\UpdateEntityRequest;
use Illuminate\Http\Request;

class EntityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Entity::orderBy('name')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validators = [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['required'],
            'color' => ['required', 'string', 'max:7', 'min:7'],
        ];

        $validated = $request->validate($validators);

        $image = $request->file('image');

        unset($request['image']);
        $entity = Entity::create($validated);
        return $entity;
    }

    /**
     * Display the specified resource.
     */
    public function show(Entity $entity)
    {
        return $entity;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntityRequest $request, Entity $entity)
    {
        return "sup2";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entity $entity)
    {
        Entity::destroy($entity->id);
    }
}
