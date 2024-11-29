const { Router } = require("express");
const { AuthRouter } = require("./auth/auth.routes");
const { UserRouter } = require("./user/user.routes");
const { CategoryRouter } = require("./category/category.routes");
const { OptionRoutes } = require("./options/option.routes");
const { PostRouter }= require("./post/post.routes");

const mainRoutes = Router()

mainRoutes.use("/auth", AuthRouter)
mainRoutes.use("/user", UserRouter)
mainRoutes.use("/category", CategoryRouter)
mainRoutes.use("/option", OptionRoutes)
mainRoutes.use("/post", PostRouter)
// mainRoutes.get("/", (req,res)=>{
//     res.locals.layout = "./layouts/website/main.ejs" 
//     res.render("./pages/home/index.ejs")
// })
mainRoutes.get("/panel", (req,res)=>{
    res.locals.layout = "./layouts/panel/main.ejs" 
    res.render("./pages/panel/dashboard.ejs")
})

module.exports = mainRoutes