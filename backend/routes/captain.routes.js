const express = require('express')
const captainRouter = express.Router()
const captainController = require("../controllers/captain.controller")
const { body } = require("express-validator")
const authMiddleware = require("../middlewares/auth.middleware")

captainRouter.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

captainRouter.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain
)

captainRouter.get("/profile", authMiddleware.authCaptain, captainController.getCaptain)

captainRouter.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain)



module.exports = captainRouter

