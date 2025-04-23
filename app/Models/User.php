<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    const IS_VALID_EMAIL = 1;
    const IS_INVALID_EMAIL = 0;
    const ADMIN_ROLE = 'ADMIN';
    const DRIVER_ROLE = 'DRIVER';
    const CUSTOMER_ROLE = 'CUSTOMER';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     * 
     */
    protected $fillable = [
        'name',
        'email',
        'otp_code',
        'password',
        'is_valid_Email',

    ];

    public static function generateOTP($length = 6)
    {
        if($length <= 0 ) return '';

        $otp = '';
        for($i = 0; $i < $length; $i++){
            $otp .= mt_rand(0, 9);
        }

        return $otp;
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
