const createHttpError = require("http-errors");
const GuardMessage = require("./messages/guard.message");
const jwt = require("jsonwebtoken");
const userModel = require("../../module/user/user.model");
const dotenv = require("dotenv");
dotenv.config()

const Authorization = async (req,res,next)=>{
    try {
        const token = req?.cookies?.access_token;
        if(!token){
            res.redirect("/auth/login")
            throw  new createHttpError.Unauthorized(GuardMessage.Login)
        }
            
            
        const data = jwt.verify(token , process.env.JWT_SECRET_KEY)
        if(data?.id){
            const user = await userModel.findById(data.id,{accessToken : 0 , otp : 0 , __v : 0 , updatedAt : 0 , verifiedMobile : 0}).lean() //for better performance 
            if(!user) throw new createHttpError.NotFound(GuardMessage.NotFoundAccount)
            req.user = user
            return next()
        }
        throw new createHttpError.Unauthorized(GuardMessage.InvalidToken)
    } catch (error) {
        next(error)
    }
        
}

module.exports = Authorization