const express = require("express");
const { getRecipeById } = require("../../controllers/recipeController");
const router = express.Router();
const { createRecipe } = require("../../controllers/recipeController");

// //create new recipe
router.post("/", createRecipe);
// //get all recipes list
// router.get("/", listRecipes);
//get recipe by id
router.get("/:id", getRecipeById);
// //update recipe data
// router.patch("/:id", updateRecipe);
// //delete recipe
// router.delete("/:id", deleteRecipe);

module.exports = router;
