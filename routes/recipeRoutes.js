import express from "express";
import validateRecipe from "../middleware/validateRecipe.js"

// Controller imports will be imported here when recipeController.js is completed.

const recipeRoutes = express.Router();


//Get all recipes
recipeRoutes.get("/", getRecipes);

//Search for recipe by ingredient
recipeRoutes.get("/search", searchRecipes);

//Get one recipe by id
recipeRoutes.get("/:id",getRecipeById);

//Create a new recipe
recipeRoutes.post("/", validateRecipe, createRecipe);

//Update an existing recipe
recipeRoutes.put("/:id",validateRecipe, updateRecipe);

//Delete an existing recipe
recipeRoutes.delete("/:id", deleteRecipe);

export default recipeRoutes;