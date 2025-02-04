import { addMoreImage, addProject, deleteProject, getProjects, updateProject } from '../controllers/project.controller.js'
import express from 'express'


const router = express.Router()

router.post("/project",addProject)
router.get("/project",getProjects)
router.patch("/project",updateProject)
router.delete("/project", deleteProject)
router.post("/project/image",addMoreImage)

export default router;