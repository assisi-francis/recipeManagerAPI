import express from "express";
import {validateRecipe, validateRecipeUpdate} from "../middleware/validateRecipe.js"

// Controller imports will be imported here when recipeController.js is completed.

const recipeRoutes = express.Router();


//Get all recipes
recipeRoutes.get("/", controller.getAllRecipes);

//Search for recipe by ingredient
recipeRoutes.get("/search", controller.search);

//Get one recipe by id
recipeRoutes.get("/:id",controller.getRecipeById);

//Create a new recipe
recipeRoutes.post("/", validateRecipe, controller.create);

//Update an existing recipe
recipeRoutes.put("/:id",validateRecipeUpdate, controller.update);

//Delete an existing recipe
recipeRoutes.delete("/:id", controller.delete);

export default recipeRoutes;