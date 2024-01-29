const express = require("express");
const { getRecipeById } = require("../../controllers/recipeController");
const router = express.Router();
const { createRecipe } = require("../../controllers/recipeController");

const {
  UpdateRecipe,
  DeleteRecipe,
  GetRecipes,
  createRecipe,
  getRecipeById,
} = require("../../controllers/recipeController");

// //create new recipe
router.post("/", createRecipe);
// //get all recipes list
router.get("/", GetRecipes);
// //get recipe by id
router.get("/:id", getRecipeById);
// //update recipe data
router.put("/:id", UpdateRecipe);
// //delete recipe
router.delete("/:id", DeleteRecipe);

module.exports = router;
