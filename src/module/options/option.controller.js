const autoBind = require("auto-bind");
const optionService = require("./option.service");
const httpCodes = require("http-codes");
const OptionMessage = require("./messages/option.message");

class OptionController{
    #service
    constructor(){
        autoBind(this)
        this.#service = optionService
    }
    async create(req,res,next){
        try {
            const {title , key , category , guid ,type ,enum : list, required} = req.body
            await this.#service.create({title , key , category , guid ,type ,enum : list, required})
            return res.status(httpCodes.CREATED).json({
                message : OptionMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req,res,next){
        try {
            const {title , key , category , guid ,type ,enum : list, required} = req.body
            const {id} = req.params
            await this.#service.update(id, {title , key , category , guid ,type ,enum : list, required})
            return res.json({
                message : OptionMessage.Updated
            })
        } catch (error) {
            next(error)
        }
    }
    async find(req,res,next){
        try {
            const options = await this.#service.find()
            return res.json(options)
        } catch (error) {
            next(error)
        }
    }
    async findById(req,res,next){
        try {
            const {id} = req.params
            const options = await this.#service.findById(id)
            return res.json({options})
        } catch (error) {
            next(error)
        }
    }
    async removeById(req,res,next){
        try {
            const {id} = req.params
            await this.#service.removeById(id)
            return res.json({
                message: OptionMessage.Deleted
            })
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req,res,next){
        try {
            const {categoryId} = req.params
            const option = await this.#service.findByCategoryId(categoryId)
            return res.json({option})
        } catch (error) {
            next(error)
        }
    }
    async findByCategorySlug(req,res,next){
        try {
            const {categorySlug} = req.params
            const option = await this.#service.findByCategorySlug(categorySlug)
            return res.json({option})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController