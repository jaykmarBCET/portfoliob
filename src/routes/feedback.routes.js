import express from 'express'
import { deleteFeedBack, feedBack, getFeedBack } from '../controllers/feedback.controller.js'
import {verifyOwner} from '../middleware/owner.middleware.js'

const router = express.Router()

router.post("/feedback",feedBack)
router.get("/feedback",verifyOwner, getFeedBack)
router.delete("/feedback",verifyOwner,deleteFeedBack)

export default router