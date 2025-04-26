<?php

namespace App\Http\Controllers\Auth;

use App\Events\SendEmailEvent;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'email' => 'required|email',
            'password' =>'required'
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $user = User::getUserByEmail($fields['email']);

        if(!$user || !Hash::check($fields['password'], $user->password))
        {
            return response([
                'message' => 'Email Or password is incorrect',
                'isLogged' => false,
            ], 401);
        }

        $token = $user->createToken(env('SECRET_TOKEN_KEY'));

        return response([
            'user' => $user,
            'token' => $token->plainTextToken,
        ], 200);
    }

    public function register(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'name' => 'required|string',
            'password' =>'required|max:6',
            'email' => 'required|email|unique:users,email',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $otpCode = User::generateOTP();
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'otp_code' => $otpCode,
            'is_valid_Email' => User::IS_INVALID_EMAIL,
            'password' => bcrypt($fields['password']),
        ]);

        #dispatch email event
        SendEmailEvent::dispatch($user);

        return response([
            'message' => 'Your account has been created successfully',
            'user' => $user,
        ], 200);
    }

    public function validateUserEmail(Request $request)
    {
        $email = $request->email;
        $otpCode = $request->otp_code;
        $user = User::getUserByEmail($email);

        if(!$user){
            return response([
               'message' => 'User not found',
               'user' => $user,
            ], 404);
        }elseif($user->otp_code != $otpCode){
            return response([
                'message' => 'Invalid OTP code',
                'user' => $user,
            ], 422);
        }elseif($user->is_valid_email == User::IS_VALID_EMAIL){
            return response([
               'message' => 'Your email has been verified, you can login',
               'user' => $user,
            ], 409);
        }

        $user->update([
            'is_valid_Email' => User::IS_VALID_EMAIL,
        ]);

        return response([
            'message' => 'Email verification successful.',
            'user' => $user,
        ], 200);
    }
}
