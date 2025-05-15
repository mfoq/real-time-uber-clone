<?php

namespace App\Http\Controllers\Vehicle;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class VehicleController extends Controller
{
    public function getVehicles(Request $request)
    {
        $data = DB::table('vehicles')
            ->select('*')
            ->get();
            
        return response($data, 200);
    }

    public function addImage(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'id' =>'required',
            'image' => 'required|image|max:2043',
        ]);

        #json response
        if($errors->fails()){
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        if($request->has('image'))
        {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            Storage::disk('public')->put('/images/'. $imageName, file_get_contents($image));

            $imageUrl = Storage::disk('public')->url('/images/'. $imageName);

            $vehicle = Vehicle::where('id', $fields['id'])
                ->update([
                    'image' => $imageUrl,
                ]);

            return response([
                'message' => 'Vehicle image uploaded successfully',
                'vehicle' => $vehicle,
            ], 200);
        }
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

        Vehicle::where('id', $fields['id'])
            ->update([
                'name' => $fields['name'],
                'model' => $fields['model'],
                'price' => $fields['price'],
            ]);

        return response([
            'message' => 'Vehicle updated successfully',
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
