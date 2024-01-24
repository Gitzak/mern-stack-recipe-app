const express = require("express");
const router = express.Router();

const { createUser } = require("../../controllers/userController");

//create new user
router.post("/", createUser);
//Register User route
// router.post("/register", registerUser);
// // login user route
// router.post("/login", loginUser);
// //user validation account
// router.put("/validate/:id", validateUser);
// //get all users list
// router.get("/", getUsers);
// //get user by id
// router.get("/user/:id", getUserById);
// // User update route
// router.patch("/update/:id", updateUser);
// //delete account for customer
// router.delete("/delete/:id", deleteCustomer);

module.exports = router;
