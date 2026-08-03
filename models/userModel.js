const db = require("../config/db");

// ======================================
// GET All Users
// ======================================
const getAllUsers = (callback) => {

    const sql = "SELECT * FROM users";

    db.query(sql, callback);

};

// ======================================
// GET User By ID
// ======================================
const getUserById = (id, callback) => {

    const sql = `
        SELECT * FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

// ======================================
// UPDATE USER
// ======================================
const updateUser = (id, user, callback) => {

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [user.name, user.email, user.age, id],
        callback
    );

};

// ======================================
// DELETE USER
// ======================================
const deleteUser = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

// ======================================
// CREATE User
// ======================================
const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [user.name, user.email, user.age],
        callback
    );

};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};