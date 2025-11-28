<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\services;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServicesController extends Controller
{
    public function index()
    {
        $services = services::active()->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show($slug)
    {
        $service = services::where('slug', $slug)->active()->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'active' => 'boolean'
        ]);

        $data['slug'] = Str::slug($data['title']);

        $service = services::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Service créé avec succès',
            'data' => $service
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $service = services::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'active' => 'sometimes|boolean',
        ]);

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $service->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Service mis à jour avec succès',
            'data' => $service
        ]);
    }

    public function destroy($id)
    {
        $service = services::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service supprimé avec succès'
        ], 204);
    }
}
