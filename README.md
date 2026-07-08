# Recipe Manager API

A simple REST API built with Node.js and Express to manage a collection of recipes. Data is stored locally in a JSON file (`recipes.json`).

## Features
- Full CRUD operations for recipes
- Search by specific ingredients or general keywords
- Input validation via custom middleware
- File-based persistence

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

By default, the server runs on `http://localhost:3000`.

## API Endpoints

### `GET /recipes`
Returns a list of all recipes.
- **Query Parameters**:
  - `?ingredient=tomato` - Filter recipes that contain a specific ingredient
  - `?q=rice` - Search for keywords across names, ingredients, instructions, and categories

### `GET /recipes/:id`
Fetch a specific recipe by its ID.

### `POST /recipes`
Create a new recipe.
- **Body** (JSON):
  ```json
  {
    "name": "Spaghetti",
    "ingredients": ["pasta", "tomato sauce"],
    "instructions": "Boil pasta. Add sauce.",
    "category": "Dinner",
    "prepTimeMinutes": 20,
    "servings": 2
  }
  ```

### `PUT /recipes/:id`
Update an existing recipe. Supports partial updates.
- **Body** (JSON): Fields to update

### `DELETE /recipes/:id`
Delete a recipe by ID.

## Data Structure
All data is stored in `recipes.json`. The API automatically assigns an `id`, `createdAt`, and `updatedAt` timestamp for new entries.
