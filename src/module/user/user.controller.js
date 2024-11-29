const autoBind = require("auto-bind")
const UserService = require("./user.service")
const userMessage = require("./messages/user.message")
const dotenv = require("dotenv")
const NodeEnv = require("../../common/constant/env.enum")
dotenv.config()

class UserController {
    #service
    constructor(){
        autoBind(this)
        this.#service = UserService
    }
    async whoami(req,res,next){
        try {
           const user = req.user;
           return res.json(user)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new UserController