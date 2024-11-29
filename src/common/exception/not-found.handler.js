function NotFound(app){
    app.use((req,res,next)=>{
        res.status(404).json({
            message : "Not Found Rout"
        })
        next()
    })
}

module.exports = NotFound