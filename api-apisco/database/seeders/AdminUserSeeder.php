<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Apisco',
            'email' => 'apiscogroupe@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+225 07 68 74 47 68',
            'company' => 'Apisco Groupe',
        ]);

        // Créer aussi un utilisateur client de test
        User::create([
            'name' => 'Client Test',
            'email' => 'client@apisco.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '+225 07 68 74 47 68',
            'company' => 'Entreprise Test',
        ]);
    }
}
