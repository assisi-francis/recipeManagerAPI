const validateRecipe = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body is missing or empty.' });
    }
    const errors = [];
    const { id, name, category, ingredients, instructions } = req.body;
// checking if the id field is valid
    if ( typeof id !== 'number') {
        errors.push('Invalid or missing recipe ID.');
    }
    //checking if the name field is valid
    if (typeof name !== 'string' || name.trim()) {
        errors.push('Name is required and must be a text string.');
    }
   // checking if the category field is valid
    if (typeof category !== 'string' || category.trim()) {
        errors.push('Category is required and must be a text string.');
    }
    //checking if the ingredients field is valid
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        errors.push('Ingredients is required and must be an array.');
    } else {
        ingredients.forEach((ingredient, i) => {
            if (typeof ingredient !== 'string' || ingredient.trim()) {
                errors.push(`Ingredient at index ${i + 1} must be a text string.`);
            }
        });
    }
    //checking if the instructions field is valid
    if (typeof instructions !== 'string' || instructions.trim()) {
        errors.push('Instructions is required and must be a text string.');
    }
if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
}


//only checks fields that are present in the request body, allowing for partial updates
const validateRecipeUpdate = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }

  const errors = [];
  const { name, category, ingredients, instructions } = req.body;

  if (name !== undefined && (typeof name !== "string" || !name.trim()))
     errors.push("Name must be text");
  if (category !== undefined && (typeof category !== "string" || !category.trim()))
     errors.push("Category must be text");
  if (instructions !== undefined && (typeof instructions !== "string" || !instructions.trim()))
     errors.push("Instructions must be text");

  if (ingredients !== undefined) {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      errors.push("Ingredients must be a list and cannot be empty");
    } else {
      ingredients.forEach((ingredient, i) => {
        if (typeof ingredient !== "string" || !ingredient.trim()) {
          errors.push(`Ingredient ${i + 1} must be text`);
        }
      });
    }
  }

  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};
export  { validateRecipe, validateRecipeUpdate };