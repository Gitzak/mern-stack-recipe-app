const express = require("express");
const router = express.Router();
const {
    createRecipe,
    GetRecipes,
    getRecipeById,
    UpdateRecipe,
    DeleteRecipe,
} = require("../../controllers/recipeController");

//create new recipe
router.post("/", createRecipe);
//get all recipes list
router.get("/", GetRecipes);
//get recipe by id
router.get("/:id", getRecipeById);
//update recipe data
router.put("/:id", UpdateRecipe);
//delete recipe
router.delete("/:id", DeleteRecipe);

module.exports = router;
