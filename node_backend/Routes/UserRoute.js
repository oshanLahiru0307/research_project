const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../Controllers/UserControler');

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getAllUsers);

// Get a user by ID
router.get('/users/:id', getUserById);

// Update a user by ID
router.put('/users/:id', updateUser);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;