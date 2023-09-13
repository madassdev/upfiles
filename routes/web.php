<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/files', [ItemController::class, 'index'])->middleware(['auth'])->name('items.index');
Route::post('/files', [ItemController::class, 'create'])->middleware(['auth'])->name('items.create');
Route::post('/files/{item}/rename', [ItemController::class, 'rename'])->middleware(['auth'])->name('items.rename');
Route::post('/files/actions/copy', [ItemController::class, 'copyItems'])->middleware(['auth'])->name('items.copy');
Route::post('/files/actions/move', [ItemController::class, 'moveItems'])->middleware(['auth'])->name('items.move');
Route::get('/files/{item}', [ItemController::class, 'show'])->middleware(['auth'])->name('items.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';