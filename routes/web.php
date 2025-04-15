<?php

use Illuminate\Support\Facades\Route;

#http://127.0.0.2/app/login/
Route::get('/app/{view_page}', function () {
    return view('welcome');
});

