function validateRecipe(req, res, next) {
    const errors = [];
    const { id, name, category, ingredients, instructions } = req.body;
// checking if the id field is valid
    if ( typeof id !== 'number') {
        errors.push('Invalid or missing recipe ID.');
    }
    //checking if the name field is valid
    if (typeof name !== 'string' || name.trim() === '') {
        errors.push('Name is required and must be a text string.');
    }
   // checking if the category field is valid
    if (typeof category !== 'string' || category.trim() === '') {
        errors.push('Category is required and must be a text string.');
    }
    //checking if the ingredients field is valid
    if (ingredients.length === 0 || !Array.isArray(ingredients)) {
        errors.push('Ingredients is required and must be an array.');
    }
    //checking if the instructions field is valid
    if (typeof instructions !== 'string' || instructions.trim() === '') {
        errors.push('Instructions is required and must be a text string.');
    }
if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
}
export default validateRecipe;