<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\services;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Développement Web',
                'description' => 'Création de sites web et applications sur mesure',
                'price' => 2500.00,
                'duration' => '2-4 semaines',
            ],
            [
                'title' => 'Application Mobile',
                'description' => 'Développement d\'applications iOS et Android',
                'price' => 5000.00,
                'duration' => '4-8 semaines',
            ],
            [
                'title' => 'Consulting IT',
                'description' => 'Audit et conseil en transformation digitale',
                'price' => null, // Sur devis
                'duration' => 'Variable',
            ],
            [
                'title' => 'Maintenance & Support',
                'description' => 'Maintenance préventive et corrective de vos systèmes',
                'price' => 150.00,
                'duration' => 'par heure',
            ],
        ];

        foreach ($services as $service) {
            services::create($service);
        }
    }
}
