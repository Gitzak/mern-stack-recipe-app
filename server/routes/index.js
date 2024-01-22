const router = require("express").Router();
const recipeRoutes = require("./api/recipeRoutes");
const { sanitize } = require("../middleware/sanitize");

router.use(sanitize);
// api Users routes
router.use("/recipes", recipeRoutes);

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
