import { addSkills, deleteSkills, getSkills, updateDescriptionAndTitle, updateImage } from '../controllers/skills.controller.js'
import express from 'express'


const router = express.Router()

router.post("/skills",addSkills)
router.get("/skills",getSkills)
router.patch("/skills",updateDescriptionAndTitle)
router.patch("/skills/image",updateImage)
router.delete("/skills",deleteSkills)

export default router;