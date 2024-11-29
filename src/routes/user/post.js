const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Register
exports.userRegisterHandler = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // validations
        if (!username) return res.status().send({ message: "User Name is requried" });
        if (!email) return res.status().send({ message: "email is requried" });
        if (!password) return res.status().send({ message: "password is requried" });

        // checking the User Name is already exists or not 
        const isAvailableUserName = await User.findOne({ username: username });
        if (isAvailableUserName) {
            return res.status(400).json({ message: "username already exists" });
        }

        // checking the email is already exists or not 
        const isAvailableEmail = await User.findOne({ email: email });
        if (isAvailableEmail) {
            return res.status(400).json({ message: "email is already exists" });
        }

        // creating user 
        const user = await User.create({ username, email, password, role });

        return res.status(201).send({ message: 'User registered successfully!', user });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

// Login
exports.userLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validations
        if (!email) return res.status().send({ message: "email is requried" });
        if (!password) return res.status().send({ message: "password is requried" });

        // finding the user 
        const user = await User.findOne({ email: email });

        // checking the password
        if (!user || (user && !(await user.comparePassword(password)))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // generating the token 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Update user role (Admin only)
exports.singleUserHandler = async (req, res) => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(401).send({ message: 'Role is required' });
        }
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        // if the user not exist 
        if (!user) {
            return res.status(401).send({ error: 'Invalid User id' });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};