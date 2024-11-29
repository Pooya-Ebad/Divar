const createHttpError = require("http-errors")
const userMessage = require("./messages/user.message")
const autoBind = require("auto-bind")
const dotenv = require("dotenv")
dotenv.config()
class UserService {
    constructor(){
        autoBind(this)
    }
   
}

module.exports = new UserService  //singleton export