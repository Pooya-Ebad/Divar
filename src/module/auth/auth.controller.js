const autoBind = require("auto-bind")
const AuthService = require("./auth.service")
const authMessage = require("./messages/auth.message")
const dotenv = require("dotenv")
const NodeEnv = require("../../common/constant/env.enum")
const cookiesName = require("../../common/constant/cookie.enum")
dotenv.config()

class AuthController {
    #service
    constructor(){
        autoBind(this)
        this.#service = AuthService
    }
    async sendOTP(req,res,next){
        try {
            const { mobile } = req.query;
            if(isNaN(+mobile)) throw new Error(authMessage.PhoneNumberIncorrect)
            const result = await this.#service.sendOTP(mobile)
            res.render("./pages/auth/login.ejs",{
                result,
                mobile
            })
            // return res.json({
            //     status : result?.status ?? result.statusCode ,                
            //     message : result?.message ?? result
            // })
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req,res,next){
        try {
            const { code } = req.body;
            const { mobile } = req.query;
            const otpResult = await this.#service.checkOTP(mobile, code)
            return res.cookie(cookiesName.AccessToken, otpResult.token,{
                    httpOnly :true,
                    secure : process.env.NODE_ENV === NodeEnv.Production
                }).render("./pages/auth/login.ejs",{
                    otpResult,
                    mobile
                })
                // .res.json({
                //     message : otpResult
                // })
            
        } catch (error) {
            next(error)
        }
    }
    async logout(req,res,next){
        try {
            res.clearCookie(cookiesName.AccessToken).status(200).json({
                message : authMessage.LogoutSuccessfully
        })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController