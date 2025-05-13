<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = '123456';
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'otp_code' => '',
            'role' => User::ADMIN_ROLE,
            'is_valid_Email' => User::IS_VALID_EMAIL,
            'password' => bcrypt($password),
        ]);
    }
}
