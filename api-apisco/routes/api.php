<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// OAuth routes
Route::get('/oauth/{provider}/redirect', [OAuthController::class, 'redirect']);
Route::get('/oauth/{provider}/callback', [OAuthController::class, 'callback']);

// Services publics
Route::get('/services', [ServicesController::class, 'index']);
Route::get('/services/{slug}', [ServicesController::class, 'show']);

// Devis public
Route::post('/quotes', [QuoteController::class, 'store']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Commandes client
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/my', [OrderController::class, 'myOrders']);

    // Routes admin
    Route::middleware('can:admin')->group(function () {
        Route::get('/admin/orders', [OrderController::class, 'index']);
        Route::patch('/admin/orders/{id}', [OrderController::class, 'update']);

        Route::apiResource('/admin/services', ServicesController::class)->except(['create', 'edit']);

        Route::get('/admin/quotes', [QuoteController::class, 'index']);
    });
});
