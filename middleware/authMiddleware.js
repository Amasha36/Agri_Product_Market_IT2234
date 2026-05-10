const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Header එකේ Token එක තියෙනවාද බලනවා
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Token එක නිවැරදිද කියා පරීක්ෂා කිරීම
            const decoded = jwt.verify(token, "your_jwt_secret");
            req.user = decoded;
            next(); // ඔක්කොම හරි නම් ඊළඟ පියවරට යනවා
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Admin ද කියා පරීක්ෂා කරන Middleware එක
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, admin };