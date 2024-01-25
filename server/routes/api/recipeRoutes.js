const express = require("express");
const router = express.Router();

const recipesController = require("../../controllers/recipeController")

// //create new recipe
// router.post("/", createRecipe);
// //get all recipes list
router.get("/", recipesController.GetRecipes);
// //get recipe by id
// router.get("/:id", getRecipeById);
// //update recipe data
router.patch("/:id", recipesController.UpdateRecipe);
// //delete recipe
router.delete("/:id", recipesController.DeleteRecipe);

module.exports = router;
