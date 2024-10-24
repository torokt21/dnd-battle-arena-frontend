<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\EntitySceneController;
use App\Http\Controllers\SceneController;

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::apiResource('entities', EntityController::class);
Route::apiResource('scenes', SceneController::class);
