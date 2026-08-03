const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users/:id", userController.getUserById);

// ======================================
// GET All Users
// ======================================
router.get("/users", userController.getAllUsers);

// ======================================
// UPDATE USER
// ======================================
router.put("/users/:id", userController.updateUser);

// ======================================
// CREATE User
// ======================================
router.post("/users", userController.createUser);

// ======================================
// DELETE USER
// ======================================
router.delete("/users/:id", userController.deleteUser);

module.exports = router;