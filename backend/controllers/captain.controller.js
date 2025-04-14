const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");



module.exports.registerCaptain = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { fullname, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email })

        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exist' })
        }

        const hashedPassword = await captainModel.hashedPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        })

        const token = captain.generateAuthToken();

        res.status(201).json({ message: "Captain Registered Successfuly!!", token, captain })


    } catch (error) {
        res.status(401).json({
            message: "Something went wrong while creating Captain!!!"
        })
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ message: "Captain logged in Successfuly!!", token, captain });


    } catch (error) {
        res.status(401).json({
            message: "Something went wrong while Login Captain!!!"
        })
    }
}

module.exports.getCaptain = async (req, res, next) => {
    res.status(200).json({ message: "Profile fetched Successfully ", captain: req.captain })
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token })

    res.clearCookie('token');

    res.status(200).json({ message: "Captain Logout successfully" })
}