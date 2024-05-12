<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetSportsForPage;
use App\Http\Controllers\BetSlipController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\MatchController;
use App\Http\Controllers\Admin\SportController;
use App\Http\Controllers\Admin\LeagueController;
use App\Http\Controllers\Admin\MarketController;
use App\Http\Controllers\Admin\MarketDetailController;


Route::get('/', [GetSportsForPage::class,'index']);
Route::get('/fmain/{id}',[GetSportsForPage::class,'index']);
Route::get('/fmain/{id}/{lid}',[GetSportsForPage::class,'index']);
Route::get('add/odds/betslip',[BetSlipController::class,'addOdds']);
Route::get('betslip/remove/bet',[BetSlipController::class,'removeOdds']);
Route::get('/betslip/bet/remove-all/',[BetSlipController::class,'removeAllOdds']);

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
// Route::resource('markets', MarketController::class);
Route::get('/markets/{id}', [ MarketController::class,'index'])->name('markets.index');
Route::get('/markets/create/{id}', [ MarketController::class,'create'])->name('markets.create');
Route::post('/markets/store/{id}', [ MarketController::class,'store'])->name('markets.store');
Route::get('/markets/{market}/edit', [ MarketController::class,'edit'])->name('markets.edit');
Route::put('/markets/{market}', [ MarketController::class,'update'])->name('markets.update');
Route::delete('/markets/{market}', [ MarketController::class,'destroy'])->name('markets.destroy');


Route::get('/market-details/{id}', [ MarketDetailController::class,'index'])->name('market-details.index');
Route::get('/market-details/create/{id}', [ MarketDetailController::class,'create'])->name('market-details.create');
Route::post('/market-details/store/{id}', [ MarketDetailController::class,'store'])->name('market-details.store');
Route::get('/market-details/{marketdetail}/edit', [ MarketDetailController::class,'edit'])->name('market-details.edit');
Route::put('/market-details/{marketdetail}', [ MarketDetailController::class,'update'])->name('market-details.update');
Route::delete('/market-details/{marketdetail}', [ MarketDetailController::class,'destroy'])->name('market-details.destroy');
