import feedback from '../routes/feedback.routes.js'
import express from 'express'


const router = express.Router()

router.use(feedback)

export default router