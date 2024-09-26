const jwt = require('jsonwebtoken');
const User = require('../schema/user.schema');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token from header

            const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify the token

            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request

            next(); // Proceed to next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" })
            }
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
