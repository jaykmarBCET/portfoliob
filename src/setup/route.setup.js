import express from "express";
import Backend from '../routes/backend.routes.js';
import Frontend from '../routes/frontend.routes.js';
import Skills from '../routes/skill.routes.js';
import Programing from '../routes/programing.routes.js';
import Project from '../routes/project.routes.js';
import { verifyOwner } from '../middleware/owner.middleware.js';

const router = express.Router();

router.use("/improve/backend",verifyOwner, Backend);
router.use("/improve/frontend",verifyOwner, Frontend);
router.use('/improve/skills',verifyOwner, Skills);
router.use('/improve/programing',verifyOwner, Programing);
router.use("/improve/project",verifyOwner, Project);

export default router;
