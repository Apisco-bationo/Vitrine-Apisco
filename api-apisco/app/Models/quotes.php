<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class quotes extends Model
{
    use HasFactory;

    /**
     * Statuts possibles des devis
     */
    const STATUS_NEW = 'new';
    const STATUS_IN_REVIEW = 'in_review';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_REJECTED = 'rejected';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'description',
        'budget',
        'preferred_deadline',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'budget' => 'decimal:2',
        'preferred_deadline' => 'date'
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope pour les nouveaux devis
     */
    public function scopeNew($query)
    {
        return $query->where('status', self::STATUS_NEW);
    }

    /**
     * Scope pour les devis en revue
     */
    public function scopeInReview($query)
    {
        return $query->where('status', self::STATUS_IN_REVIEW);
    }

    /**
     * Scope pour les devis acceptés
     */
    public function scopeAccepted($query)
    {
        return $query->where('status', self::STATUS_ACCEPTED);
    }

    /**
     * Format budget for display
     */
    public function getFormattedBudgetAttribute(): string
    {
        if ($this->budget === null) {
            return 'Non spécifié';
        }

        return number_format($this->budget, 2, ',', ' ') . ' €';
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_NEW => 'Nouveau',
            self::STATUS_IN_REVIEW => 'En revue',
            self::STATUS_ACCEPTED => 'Accepté',
            self::STATUS_REJECTED => 'Rejeté',
            default => $this->status
        };
    }

    /**
     * Vérifie si le devis est nouveau
     */
    public function isNew(): bool
    {
        return $this->status === self::STATUS_NEW;
    }

    /**
     * Vérifie si le devis est en revue
     */
    public function isInReview(): bool
    {
        return $this->status === self::STATUS_IN_REVIEW;
    }

    /**
     * Vérifie si le devis est accepté
     */
    public function isAccepted(): bool
    {
        return $this->status === self::STATUS_ACCEPTED;
    }
}
