const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const CategoryMessage = require("./messages/category.message");
const httpCodes = require("http-codes")
class CategoryController{
    #service
    constructor(){
        autoBind(this)
        this.#service = categoryService
    }
    async create(req,res,next){
        try {
            const {name , slug , icon , parent} = req.body
            await this.#service.create({name , slug , icon , parent})
            return res.status(httpCodes.CREATED).json({
                message : CategoryMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }
    async find(req,res,next){
        try {
            const category = await this.#service.find()
            return res.json({
                message : CategoryMessage.Created,
                Categories : category
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req,res,next){
        try {
            const {id} = req.params
            await this.#service.remove(id)
            return res.json({
                message : CategoryMessage.Deleted,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CategoryController