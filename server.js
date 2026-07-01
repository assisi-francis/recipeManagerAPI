const express = require("express");

const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Recipe Manager API");
});

// Recipe routes
app.use("/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

