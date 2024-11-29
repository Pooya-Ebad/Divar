const createHttpError = require("http-errors")
const userModel = require("../user/user.model")
const authMessage = require("./messages/auth.message")
const autoBind = require("auto-bind")
const {randomInt} = require("crypto")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
class AuthService {
    #model
    constructor(){
        autoBind(this)
        this.#model = userModel
    }
    async sendOTP(mobile){
        try {
            const user = await this.#model.findOne({mobile})
            const now = new Date().getTime()
            const otp = {
                code : randomInt(10000 , 99999),
                expiresIn : now + (1000 * 60* 5)
            }
            if(!user){
                this.#model.create({
                    mobile,
                    otp
                })
                return authMessage.SendOtpSuccessfully 
            }
            if(user.otp && user.otp.expiresIn > now){
                const timeRemained = (user.otp.expiresIn - now)/1000
                return {
                    error : new createHttpError.BadRequest(authMessage.OtpNotExpired).message,
                    time : timeRemained
                }
            }
            // user.otp = otp
            // await user.save()
            await userModel.updateOne({_id : user._id},{otp : otp,verifiedMobile : false})
            return authMessage.OtpUpdated 
            
        } catch (error) {
            return error
        }
    }
    async checkOTP(mobile , code){
        try {
            const user = await this.checkExistByMobile(mobile)
            const now = new Date().getTime()
            if(user?.otp?.expiresIn < now) return new createHttpError.Unauthorized(authMessage.OtpExpired)
            if(user?.otp?.code !== code) return new createHttpError.Unauthorized(authMessage.OtpCodeIncorrect)
            if(!user.verifiedMobile){
                user.verifiedMobile = true
            }
            const token = await this.signToken({mobile , id : user._id})
            user.accessToken = token
            await user.save()
            return {
                message : authMessage.LoginSuccessfully,
                token : token
            }
        } catch (error) {
            return error
        }
    }
    async checkExistByMobile(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createHttpError.NotFound(authMessage.NotFound)
        return user
    }
    async signToken(payload){
        return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : "1y"})
    }
}

module.exports = new AuthService  //singleton export