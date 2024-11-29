const { Router } = require("express");
const AuthController = require("./auth.controller");
const Authorization = require("../../common/guard/authorization.guard");
const upload = require("../../common/utils/multer");

const router = Router()

router.get("/login",(req,res)=>{
    res.render("./pages/auth/login.ejs", {result : null})
})
router.post("/send-otp?",AuthController.sendOTP)
router.get("/send-otp?", AuthController.sendOTP)
router.post("/check-otp?", upload.any(),AuthController.checkOTP)
router.get("/check-otp", AuthController.checkOTP)
router.get("/logout", Authorization,AuthController.logout)

module.exports = { 
    AuthRouter : router
}