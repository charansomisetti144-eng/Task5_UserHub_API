const userModel = require("../models/userModel");

// ======================================
// GET All Users
// ======================================
const getAllUsers = (req, res) => {

    userModel.getAllUsers((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Users Retrieved Successfully",
            totalUsers: results.length,
            data: results
        });

    });

};

// ======================================
// CREATE User
// ======================================
const createUser = (req, res) => {

    const { name, email, age } = req.body;

    // ======================================
    // Validation
    // ======================================

    // Name Validation
    if (!name || name.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Name must contain at least 3 characters."
        });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    // Age Validation
    if (!age || age < 1 || age > 120) {
        return res.status(400).json({
            success: false,
            message: "Age must be between 1 and 120."
        });
    }

    const user = {
        name,
        email,
        age
    };

    userModel.createUser(user, (err, result) => {

        if (err) {

            // Duplicate Email
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            userId: result.insertId
        });

    });

};

// ======================================
// GET USER BY ID
// ======================================
const getUserById = (req, res) => {

    const id = req.params.id;

    userModel.getUserById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });

    });

};

// ======================================
// UPDATE USER
// ======================================
const updateUser = (req, res) => {

    const id = req.params.id;
    const { name, email, age } = req.body;

    // Name Validation
    if (!name || name.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Name must contain at least 3 characters."
        });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    // Age Validation
    if (!age || age < 1 || age > 120) {
        return res.status(400).json({
            success: false,
            message: "Age must be between 1 and 120."
        });
    }
    const user = {
        name,
        email,
        age
    };

    userModel.updateUser(id, user, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully"
        });

    });

};

// ======================================
// DELETE USER
// ======================================
const deleteUser = (req, res) => {

    const id = req.params.id;

    userModel.deleteUser(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    });

};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};