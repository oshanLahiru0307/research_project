const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../Controllers/UserControler');

<<<<<<< HEAD
const { auth, requireRole } = require('../Middleware/auth');

// Create a new user (admin only)
router.post('/users', auth, requireRole('admin'), createUser);

// Get all users (admin only)
router.get('/users', auth, requireRole('admin'), getAllUsers);

// Get a user by ID (admin or the user themself)
router.get('/users/:id', auth, getUserById);

// Update a user by ID (admin only for now)
router.put('/users/:id', auth, requireRole('admin'), updateUser);

// Delete a user by ID (admin only)
router.delete('/users/:id', auth, requireRole('admin'), deleteUser);
=======
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
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64

module.exports = router;