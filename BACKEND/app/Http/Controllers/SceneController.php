<?php

namespace App\Http\Controllers;

use App\Models\Scene;
use App\Http\Requests\UpdateSceneRequest;
use Illuminate\Http\Request;

class SceneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Scene::orderBy('name')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $validators = [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'background' => ['required'],
            'width' => ['required', 'integer'],
            'height' => ['required', 'integer'],
        ];
        $validated = $request->validate($validators);

        // Upload file
        $file_path = $request->file('background')->store('scenes');
        $validated['background'] = $file_path;

        $scene = Scene::create($validated);
        return $scene;
    }

    /**
     * Display the specified resource.
     */
    public function show(Scene $scene)
    {
        return "Get one";
        return $scene;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSceneRequest $request, Scene $scene)
    {
        return "TODO";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scene $scene)
    {
        Scene::destroy($scene->id);
    }
}
