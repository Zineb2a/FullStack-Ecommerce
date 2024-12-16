import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized access' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
