
const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
    code : {type : String , required : false , default : undefined},
    expiresIn : {type : Number , required : false , default : 0}
})
const UserSchema = new Schema({
    fullName : {type : String , required : false},
    mobile : {type: String , required : true , unique : true},
    otp : {type : OTPSchema},
    verifiedMobile : {type : Boolean , required : true , default : false} ,
    accessToken : {type : String}
}, {timestamps : true})
const userModel = model("user", UserSchema)

module.exports = userModel