const express = require('express');
const { userRegisterHandler, userLoginHandler, singleUserHandler } = require('./post');
const { allUsersHandler } = require('./get');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { roleMiddleware } = require('../../middlewares/roleMiddleware');

const userRouter = express.Router();

// Register
userRouter.post('/register', userRegisterHandler);

// Login
userRouter.post('/login', userLoginHandler);

// Get all users (Admin only)
userRouter.get('/all-users', authMiddleware, roleMiddleware('Admin'), allUsersHandler);

// Update user role (Admin only)
// userRouter.post('update-role/:id', authMiddleware, roleMiddleware('Admin'), singleUserHandler);
userRouter.post('/update-role/:id', authMiddleware, roleMiddleware('Admin'), singleUserHandler);


module.exports = userRouter;
