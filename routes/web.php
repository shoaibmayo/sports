<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetSportsForPage;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\MatchController;
use App\Http\Controllers\Admin\SportController;
use App\Http\Controllers\Admin\LeagueController;


Route::get('/', [GetSportsForPage::class,'index']);
Route::get('/fmain/{id}',[GetSportsForPage::class,'index']);
Route::get('/fmain/{id}/{lid}',[GetSportsForPage::class,'index']);
/*
* sports 
*/
Route::get('/admin',[ SportController::class,'index']);


Route::get('/sports', [ SportController::class,'index'])->name('sports.index');
Route::get('/sports/create', [ SportController::class,'create'])->name('sports.create');
Route::post('/sports/store', [ SportController::class,'store'])->name('sports.store');
Route::get('/sports/{sport}/edit', [ SportController::class,'edit'])->name('sports.edit');
Route::put('/sports/{sport}', [ SportController::class,'update'])->name('sports.update');
Route::delete('/sports/{sport}', [ SportController::class,'destroy'])->name('sports.destroy');

Route::resource('leagues', LeagueController::class);
Route::resource('teams', TeamController::class);
Route::resource('matches', MatchController::class);
