<?php

use App\Http\Controllers\EntityController;
use App\Http\Controllers\EntitySceneController;
use App\Http\Controllers\SceneController;
use Illuminate\Support\Facades\Route;

Route::apiResource('entities', EntityController::class);
Route::apiResource('scenes', SceneController::class);
Route::apiResource('entities.scenes', EntitySceneController::class)->shallow();
