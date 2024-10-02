<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Profile\ProfileController;
use App\Http\Controllers\Admin\Country\CountryController;
use App\Http\Controllers\Admin\Locale\LocaleController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware(['redirectAdminIfAuthenticated', 'guest:admin', 'LocaleMiddleware'])->group(function () {
        Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
        Route::post('login/check', [LoginController::class, 'loginCheck'])->name('login.check');
    });

    // Route::middleware('auth:admin')->group(function () {
    Route::middleware(['redirectAdminIfNotAuthenticated', 'LocaleMiddleware'])->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

        // profile
        Route::prefix('profile')->name('profile.')->group(function() {
            Route::get('/', [ProfileController::class, 'index'])->name('index');
            Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
            Route::post('/update', [ProfileController::class, 'update'])->name('update');
        });

        // country
        Route::prefix('country')->name('country.')->group(function() {
            Route::get('/', [CountryController::class, 'index'])->name('index');
            Route::get('/edit', [CountryController::class, 'edit'])->name('edit');
            Route::post('/update', [CountryController::class, 'update'])->name('update');
        });

        // locale
        Route::prefix('locale')->name('locale.')->group(function() {
            Route::post('/update', [LocaleController::class, 'update'])->name('update');
        });
    });
});