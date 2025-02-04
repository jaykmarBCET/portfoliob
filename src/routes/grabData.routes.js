import express from 'express'
import { getBackend, getFronted, getPrograming, getProject, getSkill } from '../controllers/GrabData.controller.js'


const router = express.Router()


router.get('/backend',getBackend)
router.get("/frontend",getFronted)
router.get("/programing",getPrograming)
router.get('/project',getProject)
router.get("/skill",getSkill)

export default router;