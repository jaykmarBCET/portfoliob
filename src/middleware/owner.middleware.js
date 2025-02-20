import { AsyncHandler } from "../utils/AsyncHandel.js";
import JWT from 'jsonwebtoken';
import { User } from "../model/user.model.js";

const verifyOwner = AsyncHandler(async (req, res, next) => {
    
    const token = req.cookies?.token || req.cookies?.jwt || extractTokenFromHeader(req.headers.cookie);
    

   
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token using JWT_SECRET
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the required _id field
        if (!decoded?._id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        // Find the user by ID
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is the owner
        if (!user.isOwner || user.email !== process.env.OWNER_EMAIL) {
            return res.status(403).json({ message: "Forbidden: Only the owner can perform this action" });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
});

// Helper function to extract the token from the cookie header
function extractTokenFromHeader(cookieHeader) {
    if (!cookieHeader) return null;

    // Split the cookie string into individual cookies
    const cookies = cookieHeader.split(';');
    // Loop through cookies to find the token
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'token' || key === 'jwt') {
            return value;
        }
    }
    return null;
}

export { verifyOwner };
