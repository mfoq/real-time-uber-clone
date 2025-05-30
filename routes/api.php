<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Vehicle\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('/users', 'register');
    Route::post('/login', 'login');
    Route::post('/users/verify-email', 'validateUserEmail');

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/logout', 'logout');
        Route::get('/users', 'getUsers');
        Route::post('/users/modify-role', 'updateRole');
    });
});

Route::controller(VehicleController::class)->group(function () {
    // Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/vehicles', 'getVehicles');
        Route::post('/vehicles', 'store');
        Route::post('/vehicles/image', 'addImage');
        Route::put('/vehicles', 'update');
        Route::delete('/vehicles', 'destroy');

    // });
});