<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = orders::with(['user', 'service'])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'service_id' => 'nullable|exists:services,id',
            'custom_description' => 'required|string|min:10',
            'amount' => 'nullable|numeric|min:0',
        ]);

        $order = orders::create(array_merge($data, [
            'user_id' => $request->user()->id,
            'status' => orders::STATUS_PENDING
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Commande créée avec succès',
            'data' => $order->load('service')
        ], 201);
    }

    public function myOrders(Request $request)
    {
        $orders = $request->user()->orders()->with('service')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = orders::findOrFail($id);

        $data = $request->validate([
            'status' => 'sometimes|in:pending,in_progress,done,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $order->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Commande mise à jour avec succès',
            'data' => $order->load(['user', 'service'])
        ]);
    }
}
