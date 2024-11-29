exports.roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send({ error: 'Forbidden: Insufficient Permissions' });
        }
        next();
    };
};
