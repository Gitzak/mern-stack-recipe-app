const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const recipeRoutes = require("./api/recipeRoutes");
const categoryRoutes = require("./api/categoriesRoutes");
const { sanitize } = require("../middleware/sanitize");

router.use(sanitize);
// api Recipes routes
router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
router.use("/categories", categoryRoutes);

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
