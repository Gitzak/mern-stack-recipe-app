const express = require("express");
const router = express.Router();
const { loginValidator } = require("../../Helpers/Validators");
const { TokenCheck } = require("../../middleware/TokenCheck");
const upload = require("../../middleware/multer");
const { isAdmin } = require("../../middleware/isAdmin");

const {
  createUser,
  registerUser,
  loginUser,
  updateUser,
  validateUser,
  getUsers,
  deleteUser,
  getUserById,
} = require("../../controllers/userController");

//create new user
router.post("/", createUser);
// Register User route
router.post("/register", upload.single("image"), registerUser);
// login user route
router.post("/login", loginValidator, loginUser);
// get profile
router.get("/profile", isAdmin, (req, res) => {
  res.status(200).json({
      data: req.profile,
  });
});
//user validation account
router.put("/validate/:id", validateUser);
// //get all users list
router.get("/", getUsers);
// //get user by id
router.get("/:id", getUserById);
// User update route
router.patch("/update/:id", TokenCheck, upload.single("image"), updateUser);
// //delete account for customer
router.delete("/delete/:id", deleteUser);

module.exports = router;
