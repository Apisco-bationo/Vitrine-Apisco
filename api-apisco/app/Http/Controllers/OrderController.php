<?php

namespace App\Http\Controllers;

use App\Models\orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of all orders (Admin only).
     */
    public function index()
    {
        $orders = orders::with('user')->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'status' => 'nullable|in:pending,confirmed,completed,cancelled'
        ]);

        $order = orders::create([
            'user_id' => $request->user()->id,
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'status' => $validated['status'] ?? 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Commande créée avec succès',
            'data' => $order
        ], 201);
    }

    /**
     * Display the authenticated user's orders.
     */
    public function myOrders(Request $request)
    {
        $orders = orders::where('user_id', $request->user()->id)->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    /**
     * Update an order (Admin only).
     */
    public function update(Request $request, $id)
    {
        $order = orders::findOrFail($id);

        $validated = $request->validate([
            'status' => 'nullable|in:pending,confirmed,completed,cancelled',
            'description' => 'nullable|string',
            'amount' => 'nullable|numeric|min:0'
        ]);

        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Commande mise à jour',
            'data' => $order
        ]);
    }
}
