<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class services extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'duration',
        'active'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'active' => 'boolean',
        'price' => 'decimal:2'
    ];

    /**
     * Boot function for automatic slug generation
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });

        static::updating(function ($service) {
            if ($service->isDirty('title') && empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });
    }

    /**
     * Relation avec les commandes
     */
    public function orders()
    {
        return $this->hasMany(orders::class);
    }

    /**
     * Scope pour les services actifs
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Format price for display
     */
    public function getFormattedPriceAttribute(): string
    {
        if ($this->price === null) {
            return 'Sur devis';
        }

        return number_format($this->price, 2, ',', ' ') . ' €';
    }
}
