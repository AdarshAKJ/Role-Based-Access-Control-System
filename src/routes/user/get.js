const express = require('express');
const User = require('../../models/user');

// Get all users (Admin only)
exports.allUsersHandler = async (req, res) => {
    try {
        // find all user
        const users = await User.find();

        // return all user 
        return res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
};



