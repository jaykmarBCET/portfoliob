import { createAcount, currentUser, deleteUser, login, logout, updateUser } from '../controllers/user.controller.js'
import { verifyOwner } from '../middleware/owner.middleware.js'
import express from 'express'


const router = express.Router()

router.post("/create-account",createAcount)
router.get("/current-user",verifyOwner,currentUser)
router.patch("/update-users",verifyOwner,updateUser)
router.post("/login-user",login)
router.get("/logout",verifyOwner,logout)
router.delete("/delete-user",verifyOwner,deleteUser)


export default router
