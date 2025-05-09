import express from 'express'
import authController from '../controller/auth-controller'

const authRoutes = express.Router()

authRoutes.post('/login', express.json(), authController.loginUser)

export default authRoutes