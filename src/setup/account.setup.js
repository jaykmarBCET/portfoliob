import express from 'express'
import Account from '../routes/user.routes.js'

const router = express.Router()

router.use("/user",Account)

export default router