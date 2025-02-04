import { addPrograming, deletePrograming, getProgramings, updatePrograming } from '../controllers/programing.controller.js'
import express from 'express'

const router = express.Router()

router.post("/programing",addPrograming)
router.get("/programing",getProgramings)
router.patch("/programing",updatePrograming)
router.delete("/programing",deletePrograming)


export default router;
