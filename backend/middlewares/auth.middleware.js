const UserModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports.authUser=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }

        const isBlacklisted=await UserModel.findOne({token: token})

        if(isBlacklisted){
            return res.status(401).json({
                message:"Unauthorized !! Please Login first"
            })
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        const user=await UserModel.findById(decodedToken._id)

        req.user=user;

        return next();

    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized !! Please Login first"
        })
    }
}