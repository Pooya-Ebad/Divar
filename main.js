const express = require("express")
const dotenv = require("dotenv")
const { swaggerConfig } = require("./src/config/swagger.config")
const mainRoutes = require("./src/module/app.routes")
const NotFound = require("./src/common/exception/not-found.handler")
const AllExceptionHandler = require("./src/common/exception/all-exception.handler")
const cookieParser = require("cookie-parser")
const expressEjsLayouts = require("express-ejs-layouts")
const moment = require("jalali-moment")
const methodOverride = require("method-override")

dotenv.config()

async function main(){
    const app = express()    
    const port = process.env.PORT
    require("./src/config/mongodb.config")
    app.use(express.json())
    app.use(express.urlencoded({extended : false}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(express.static("public"))
    app.use(methodOverride('_method'))
    app.use(expressEjsLayouts)
    app.locals.moment = moment
    app.set('view engine', 'ejs')
    app.set('layout', './layouts/panel/main.ejs')
    app.set("layout extractScripts", true)
    app.set("layout extractStyles", true)
    swaggerConfig(app)
    app.use(mainRoutes)
    NotFound(app)
    AllExceptionHandler(app)
    app.listen(port,()=>{
        console.log(`server : http://localhost:${port}`);
    })
}
main()