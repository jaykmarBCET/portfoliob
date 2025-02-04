import {AsyncHandler} from '../utils/AsyncHandel.js'
import ApiResponse from '../utils/ApiResponse.js'
import {FeedBack} from '../model/feedback.model.js'
import {transporterMail} from '../email/tranporter.js'
import {User} from '../model/user.model.js'

const feedBack = AsyncHandler(async(req,res)=>{
    const {email, issus, message} = req.body;

    if (!email || !(issus || message)) {
        return res.status(400).json(new ApiResponse(400, { message: "At least email or issue and email or message required" }, "At least email or issue and email or message required"));
    }
    
    const alreadyGivenFeedBack = await FeedBack.findOne({ email });

    if (alreadyGivenFeedBack) {
        const compare = Date.now() - alreadyGivenFeedBack.createdAt;
        const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    
        if (compare < fiveDaysInMillis) {
            return res.status(400).json(new ApiResponse(400, { message: "You have already given feedback" }, "You have already given feedback"));
        } 
    }

    const response = await FeedBack.create({
        email, issus, message
    });

    if (!response) {
        return res.status(500).json(new ApiResponse(500, { message: "Something went wrong" }, "Something went wrong"));
    }
    
    await transporterMail(email, message, issus);
    return res.status(200).json(new ApiResponse(200, { response, message: "Feedback sent successfully" }, "Feedback sent successfully"));
});

const getFeedBack = AsyncHandler(async(req,res)=>{
    const allfeedBack = await FeedBack.find();
    
    if (!allfeedBack || allfeedBack.length === 0) {
        return res.status(400).json(new ApiResponse(400, { message: "No feedback found" }, "No feedback found"));
    }
    
    return res.status(200).json(new ApiResponse(200, { message: "All feedback fetched successfully", data: allfeedBack }, "All feedback fetched successfully"));
});

const deleteFeedBack = AsyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).json(new ApiResponse(400, { message: "Unauthorized request" }, "Unauthorized request"));
    }

    const { feedbackId } = req.body;
    if (!feedbackId) {
        return res.status(400).json(new ApiResponse(400, { message: "feedbackId required" }, "feedbackId required"));
    }

    const feedBack = await FeedBack.findById(feedbackId);
    if (!feedBack) {
        return res.status(404).json(new ApiResponse(404, { message: "Feedback not found" }, "Feedback not found"));
    }

    
    if (feedBack.email !== user.email && !user.isAdmin) {
        return res.status(403).json(new ApiResponse(403, { message: "You can only delete your own feedback or if you're an admin" }, "Forbidden"));
    }

    const response = await FeedBack.findByIdAndDelete(feedbackId);
    if (!response) {
        return res.status(500).json(new ApiResponse(500, { message: "Something went wrong" }, "Something went wrong"));
    }

    return res.status(200).json(new ApiResponse(200, { message: "Feedback deleted successfully" }, "Feedback deleted successfully"));
});

export { feedBack, getFeedBack, deleteFeedBack };
