import { addBackend, deleteBackend, getBackends, updateBackend } from '../controllers/backend.controller.js'
import express from 'express'


const router = express.Router()


router.post("/backend",addBackend)
router.get("/backend",getBackends)
router.patch("/backend",updateBackend)
router.delete("/backend",deleteBackend)

export default router;