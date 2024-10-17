const logRoute = (req, res, next) => {
    console.log(`[Info] API hit: ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware or route handler
};

module.exports = logRoute;