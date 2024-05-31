<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories= Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $category = new Category;
        $category->category = $request->category;
        $category->save();

        // Obtener todos los usuarios
        $games = Game::all();
    
        // Enlazamos la nueva categoria a todos los juegos con onCategory = 0
        foreach ($games as $game) {
            $game->categories()->attach($category->id, ['onCategory' => false]);
        }
    
        // Devolver la respuesta JSON, con código 201 (Created)
        $data = [
            'message' => 'Category created successfully',
            'category' => $category
        ];
        return response()->json($data, 201);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        if ($request->has('category')) {
            $category->category = $request->category;
        }
        $category->save();
        
        //Devolvemos la instancia actualizada
        $data= [
            'message'=> 'Category updated successfully',
            'category'=> $category
        ];
        return response()-> json($data);
    }

    public function destroy(Category $category)
    {
        try{
            // Eliminar las relaciones en la tabla pivote
            $category->games()->detach();
    
            $category-> delete();
    
            //Devolvemos el resultado
            return response()->json(['message' => 'Categoría eliminada correctamente.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la categoría.'], 500);
        }
    }

    // public function attach(Request $request){
    //     $category= Category::find($request->category_id);
        
    //     $category->games()->attach($request->game_id, ['onCategory' => false]);
    //     $data= [
    //         'message'=> 'Game attached successfully',
    //         'category'=> $category
    //     ];
    //     return response()->json($data, 201);
    // }
}
