import { User } from "../model/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandel.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = async (userId) => {
    const user = await User.findById(userId);
    const token = await JWT.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: String(30 * 24 * 60 * 60 * 60 * 1000) });
    return token;
};

const createAcount = AsyncHandler(async (req, res) => {
    const { name, email, isOwner, message, password } = req.body;
    if (!name || !email || !isOwner || !message) {
        return res.status(400).json(new ApiResponse(400, { message: "all field required" }, "all field required"));
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json(new ApiResponse(400, { message: "this user already exits" }, "this user already exist"));
    }
    const isAlreadyHaveAccountOfOwner = await User.findOne({ isOwner: true });
    if (isAlreadyHaveAccountOfOwner && isOwner) {
        return res.status(400).json(new ApiResponse(400, { message: "Already have owner account" }, "Already have owner account"));
    }
    const isOwnerAccount = email === process.env.OWNER_EMAIL;
    if (!isOwner) {
        return res.status(400).json(new ApiResponse(400, "only can owner make account"));
    }
    const response = await User.create({
        name, email, password, message, isOwner,
    });

    const user = await User.findById(response._id).select("-password");
    if (!user) {
        return res.status(500).json(new ApiResponse(500, { message: "something went wrong" }, "something went wrong"));
    }
    const token = await generateToken(user._id);
    if (!token) {
        return res.status(500).json(new ApiResponse(500, { message: "something went wrong while creating token" }, "something went wrong while creating token"));
    }
    return res.status(200).cookie("token", token, { httpOnly: true, secure: true }).json(new ApiResponse(200, user, "creating account successfully"));
});

const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json(new ApiResponse(400, { message: "Invalid credentials" }, "Invalid credentials"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json(new ApiResponse(400, { message: "Invalid credentials" }, "Invalid credentials"));
    }
    const token = await generateToken(user._id);
    if (!token) {
        return res.status(500).json(new ApiResponse(500, { message: "Token generation failed" }, "Token generation failed"));
    }
    return res.status(200).cookie("token", token, { httpOnly: true, secure: true }).json(new ApiResponse(200, {...user,token}, "Logged in successfully"));
});

const currentUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).json(new ApiResponse(404, { message: "User not found" }, "User not found"));
    }
    return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
});

const deleteUser = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (userId !== req.user._id.toString()) {
        return res.status(403).json(new ApiResponse(403, { message: "You can only delete your own account" }, "Forbidden"));
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json(new ApiResponse(404, { message: "User not found" }, "User not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

const updateUser = AsyncHandler(async (req, res) => {
    const { name, email, message, password } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(new ApiResponse(404, { message: "User not found" }, "User not found"));
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.message = message || user.message;
    if (password) user.password = password;

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const logout = AsyncHandler(async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
});

export { login, logout, createAcount, currentUser, deleteUser, updateUser };
