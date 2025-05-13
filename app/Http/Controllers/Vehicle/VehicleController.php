<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class VehicleController extends Controller
{
    public function getVehicles(Request $request)
    {
        
    }

    public function addImage(Request $request)
    {
        
    }

    public function store(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'name' => 'required',
            'model' =>'required',
            'price' =>'required',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $vehicle = Vehicle::create([
                'name' => $fields['name'],
                'model' => $fields['model'],
                'price' => $fields['price'],
            ]);

        return response([
            'message' => 'Vehicle added successfully',
            'vehicle' => $vehicle,
        ], 200);
    }

    public function update(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'id' =>'required',
            'name' => 'required',
            'model' =>'required',
            'price' =>'required',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $vehicle = Vehicle::where('id', $fields['id'])
            ->update([
                'name' => $fields['name'],
                'model' => $fields['model'],
                'price' => $fields['price'],
            ]);

        return response([
            'message' => 'Vehicle updated successfully',
            'vehicle' => $vehicle,
        ], 200);
    }

    public function destroy(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'id' =>'required',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        Vehicle::where('id', $fields['id'])->delete();

        return response([
            'message' => 'Vehicle delete successfully',
        ], 204);
    }
}
