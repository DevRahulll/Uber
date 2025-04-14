const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const UserModel = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const blacklistTokenModel = require("../models/blacklistToken.model");



module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }


        const { fullname, email, password } = req.body;


        const hashedPassword = await UserModel.hashPassword(password);


        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })


        const token = await user.generateAuthToken();


        res.status(201).json({
            message: "User created successfully",
            token,
            user
        })


    } catch (error) {
        res.status(401).json({
            message: "error while registering user"
        })
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = await user.generateAuthToken();

        res.cookie('token', token)
        res.status(201).json({
            message: "User logged in successfully",
            token,
            user
        })

    } catch (error) {
        res.status(401).json({
            message: "Something went wrong while Login!!!"
        })
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong while getting user details!!!"
        })
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token')
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        await blacklistTokenModel.create({ token })

        res.status(200).json({ message: "Logged out successfully!!!" })

    } catch (error) {
        res.status(401).json({
            message: "Something went wrong while Logout!!!"
        })
    }
}
