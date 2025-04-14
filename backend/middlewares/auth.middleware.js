const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model")

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const isBlacklisted = await blacklistTokenModel.findOne({ token: token })

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized !! Please Login first"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decodedToken._id)

        req.user = user;

        return next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized !! Please Login first"
        })
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized to access" })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token })

    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized to access" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain

        return next();

    } catch (error) {
        console.log(err);

        res.status(401).json({ message: 'Something went wrong! | Unauthorized' });

    }
}