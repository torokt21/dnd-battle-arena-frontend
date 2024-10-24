<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use App\Http\Requests\UpdateEntityRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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

        // Upload file
        $file_path = $request->file('image')->store('entities');
        $validated['image'] = $file_path;

        // Resize image
        $manager = new ImageManager(new Driver());
        $image = $manager->read(Storage::path($file_path));
        $image->scaleDown(width: 200);
        $image->save(Storage::path($file_path));


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
