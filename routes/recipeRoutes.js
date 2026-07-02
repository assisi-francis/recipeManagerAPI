import express from "express";


const recipeRoutes = express.Router();


//Get all recipes
recipeRoutes.get("/", getRecipes);

//Search for recipe by ingredient
recipeRoutes.get("/search", searchRecipes);

//Get one recipe by id
recipeRoutes.get("/:id",getRecipeById);

//Create a new recipe
recipeRoutes.post("/", createRecipe);

//Update an existing recipe
recipeRoutes.put("/:id", updateRecipe);

//Delete an existing recipe
recipeRoutes.delete("/:id", deleteRecipe);

export default recipeRoutes;