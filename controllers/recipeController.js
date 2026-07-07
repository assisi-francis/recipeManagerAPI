// controllers/recipeController.js

import fs from 'fs';
import path from 'path';

const recipesFile = path.join(process.cwd(), 'recipes.json');

// Read all recipes from recipes.json
function readRecipes() {
  try {
    const data = fs.readFileSync(recipesFile, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}

// Save recipes back to recipes.json
function writeRecipes(recipes) {
  fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
}

// GET /recipes
// Supports:
// GET /recipes
// GET /recipes?ingredient=tomato
// GET /recipes?q=rice
export const getAllRecipes = (req, res) => {
  let recipes = readRecipes();
  const { ingredient, q } = req.query;

  // Search by ingredient
  if (ingredient) {
    recipes = recipes.filter(recipe =>
      recipe.ingredients.some(item =>
        item.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  }

  // Bonus: Keyword search
  if (q) {
    const keyword = q.toLowerCase();

    recipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(keyword) ||
      recipe.instructions.toLowerCase().includes(keyword) ||
      recipe.ingredients.some(item =>
        item.toLowerCase().includes(keyword)
      ) ||
      (recipe.category &&
        recipe.category.toLowerCase().includes(keyword))
    );
  }

  res.status(200).json(recipes);
};

// GET /recipes/:id
export const getRecipeById = (req, res) => {
  const recipes = readRecipes();

  const recipe = recipes.find(
    recipe => recipe.id === parseInt(req.params.id)
  );

  if (!recipe) {
    return res.status(404).json({
      message: 'Recipe not found'
    });
  }

  res.status(200).json(recipe);
};

// POST /recipes
export const createRecipe = (req, res) => {
  const recipes = readRecipes();
  const now = new Date().toISOString();

  const newRecipe = {
    id:
      recipes.length > 0
        ? Math.max(...recipes.map(recipe => recipe.id)) + 1
        : 1,
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    category: req.body.category || null,
    prepTimeMinutes: req.body.prepTimeMinutes || null,
    servings: req.body.servings || null,
    createdAt: now,
    updatedAt: now
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);

  res.status(201).json(newRecipe);
};

// PUT /recipes/:id
export const updateRecipe = (req, res) => {
  const recipes = readRecipes();

  const index = recipes.findIndex(
    recipe => recipe.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Recipe not found'
    });
  }

  recipes[index] = {
    ...recipes[index],
    name: req.body.name ?? recipes[index].name,
    ingredients: req.body.ingredients ?? recipes[index].ingredients,
    instructions:
      req.body.instructions ?? recipes[index].instructions,
    category: req.body.category ?? recipes[index].category,
    prepTimeMinutes:
      req.body.prepTimeMinutes ??
      recipes[index].prepTimeMinutes,
    servings:
      req.body.servings ?? recipes[index].servings,
    updatedAt: new Date().toISOString()
  };

  writeRecipes(recipes);

  res.status(200).json(recipes[index]);
};

// DELETE /recipes/:id
export const deleteRecipe = (req, res) => {
  const recipes = readRecipes();

  const index = recipes.findIndex(
    recipe => recipe.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Recipe not found'
    });
  }

  const deletedRecipe = recipes.splice(index, 1);

  writeRecipes(recipes);

  res.status(200).json({
    message: 'Recipe deleted successfully',
    recipe: deletedRecipe[0]
  });
};
