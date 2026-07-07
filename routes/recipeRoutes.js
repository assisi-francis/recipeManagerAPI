import express from "express";
import {validateRecipe, validateRecipeUpdate} from "../middleware/validateRecipe.js"

import {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipeController.js";

const recipeRoutes = express.Router();


//Get all recipes
recipeRoutes.get("/", getAllRecipes);

//Search for recipe by ingredient
recipeRoutes.get("/search", getAllRecipes);

//Get one recipe by id
recipeRoutes.get("/:id", getRecipeById);

//Create a new recipe
recipeRoutes.post("/", validateRecipe, createRecipe);

//Update an existing recipe
recipeRoutes.put("/:id",validateRecipeUpdate, updateRecipe);

//Delete an existing recipe
recipeRoutes.delete("/:id", deleteRecipe);

export default recipeRoutes;