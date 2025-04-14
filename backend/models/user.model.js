const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")

dotenv.config()

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be atleast 3 characters"]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be atleast 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be atleast 6 characters long"]
    },
    socketId: {
        type: String
    }
}, { timestamps: true })

userSchema.methods.generateAuthToken = async function () {
    // console.log("jwt : ", process.env.JWT_SECRET);
    const token = await jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    )
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;
