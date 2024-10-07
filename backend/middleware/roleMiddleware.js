const jwt = require('jsonwebtoken');
const User = require('../models/User');

const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            const user = await User.findById(req.userId);
            if (!user || !allowedRoles.includes(user.role)) {
                return res.status(401).json({ message: 'Unauthorized access' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token verification failed', error });
        }
    };
};

module.exports = roleMiddleware;
