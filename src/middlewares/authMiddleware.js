const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({ error: 'Access Denied(Token is required)' });

    try {
        // verifing the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Invalid Token' });
    }
};
