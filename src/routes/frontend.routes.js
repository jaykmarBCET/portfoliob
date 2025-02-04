import express from 'express'
import { addFrontend, deleteFrontend, getFrontends, updateFrontend } from '../controllers/frontend.controller.js'

const router = express.Router()

router.post("/frontend",addFrontend)
router.get("/frontend",getFrontends)
router.patch("/frontend",updateFrontend)
router.delete("/frontend",deleteFrontend)


export default router


