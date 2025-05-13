<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Events\SendEmailEvent;
use Illuminate\Support\Facades\DB;
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
                'errors' => [
                    'message' => 'Email or password is incorrect',
                ],
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
            'role' => User::CUSTOMER_ROLE,
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
        $fields = $request->all();
        
        $errors = Validator::make($fields, [
            'email' =>'required|email',
            'otp_code' =>'required',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $user = User::getUserByEmail($fields['email']);

        if(!$user){
            return response([
               'message' => 'User not found',
               'user' => $user,
            ], 404);
        }elseif($user->otp_code != $fields['otp_code']){
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

        $token = $user->createToken(env('SECRET_TOKEN_KEY'));
        return response([
            'message' => 'Email verification successful.',
            'user' => $user,
            'token' => $token->plainTextToken,
        ], 200);
    }

    public function logout(Request $request)
    {
        DB::table('personal_access_tokens')
            ->where('tokenable_id', $request->user()->id)
            ->delete();

        return response([
            'message' => 'User logged out successfully',
        ]);
    }

    public function updateRole(Request $request)
    {
        DB::table('users')
            ->where('id', $request->userId)
            ->update(['role' => $request->role]);

        return response([
            'message' => 'Role updated successfully',
        ], 200);
    }

    public function getUsers(Request $request)
    {
        $query = $request->get('query');
        $data = DB::table('users')
            ->select('id', 'name', 'email', 'role')
            ->where('name', 'LIKE', '%' . $query . '%')
            ->paginate(10);

        return response($data, 200);
    }
}
