<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\quotes;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = quotes::with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $quotes
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'description' => 'required|string|min:20',
            'budget' => 'nullable|numeric|min:0',
            'preferred_deadline' => 'nullable|date|after:today',
        ]);

        // Si l'utilisateur est connecté, on utilise ses infos
        if ($request->user()) {
            $data['user_id'] = $request->user()->id;
            $data['name'] = $request->user()->name;
            $data['email'] = $request->user()->email;
            $data['phone'] = $request->user()->phone ?? $data['phone'];
        }

        $quote = quotes::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Demande de devis envoyée avec succès',
            'data' => $quote
        ], 201);
    }
}
