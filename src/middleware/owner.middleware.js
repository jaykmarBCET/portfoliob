import { AsyncHandler } from "../utils/AsyncHandel.js";
import JWT from 'jsonwebtoken';
import { User } from "../model/user.model.js";

const verifyOwner = AsyncHandler(async (req, res, next) => {
 
    const token = req.cookies.jwt || req.cookies?.token 
    
    
    

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        if (!decoded?._id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isOwner || user.email !== process.env.OWNER_EMAIL) {
            return res.status(403).json({ message: "Forbidden: Only the owner can perform this action" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
});

export { verifyOwner };
