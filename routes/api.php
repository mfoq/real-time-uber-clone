<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('/users', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::get('/users', 'getUsers');

    Route::post('/users/verify-email', 'validateUserEmail');
});
