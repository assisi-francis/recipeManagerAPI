const express = require("express");

// Import routes
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Recipe Manager API");
});

// Use recipe routes
app.use("/recipes", recipeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

