import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.token; // 🔄 Directly read the custom "token" header

        console.log("🛂 Token in headers:", req.headers.token);


        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("📨 Decoded payload:", decoded);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }

        next();
    } catch (error) {
        console.log("❌ JWT Error:", error);
        res.status(401).json({ success: false, message: "Token error: " + error.message });
    }
};

export default adminAuth;
