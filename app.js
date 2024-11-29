const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user');
require('dotenv').config();

// const authRoutes = require('./routes/auth.js');
// const userRoutes = require('./routes/user.js');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.use('/', (req, res) => {
    console.log("hello world");
    res.json({ data: "Hello World" });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
