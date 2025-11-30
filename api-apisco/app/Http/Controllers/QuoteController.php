<?php

namespace App\Http\Controllers;

use App\Models\quotes;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Display a listing of all quotes (Admin only).
     */
    public function index()
    {
        $quotes = quotes::with('user')->get();

        return response()->json([
            'success' => true,
            'data' => $quotes
        ]);
    }

    /**
     * Store a newly created quote (Public).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'service' => 'required|string',
            'message' => 'required|string',
        ]);

        $quote = quotes::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'company' => $validated['company'],
            'service' => $validated['service'],
            'message' => $validated['message'],
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Demande de devis créée avec succès',
            'data' => $quote
        ], 201);
    }

    /**
     * Display a specific quote.
     */
    public function show($id)
    {
        $quote = quotes::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $quote
        ]);
    }
}
