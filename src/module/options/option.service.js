const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const OptionMessage = require("./messages/option.message");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isValidObjectId } = require("mongoose");
const { isTrue, isFalse } = require("../../common/utils/function");

class OptionService{
    #model
    #categoryService
    constructor(){
        autoBind(this)
        this.#model = OptionModel
        this.#categoryService = categoryService
    }
    async find(){
        const options = this.#model.find({},{__v : 0},{sort : {_id : -1}}).populate([{path : "category", select : {name : 1, slug : 1}}])
        return options
    }
    async findById(id){
        const options = this.#model.findOne({_id : id},{__v : 0},{sort : {_id : -1}})
        return options
    }
    async findByCategoryId(category){
        const options = this.#model.find({category}, {__v : 0}).populate([{path : "category", select : {name : 1, slug : 1}}])
        return options
    }
    async removeById(id){
        const result = await this.#model.deleteOne({_id : id})
        if(!result) throw new createHttpError.NotFound(OptionMessage.NotFound)
        return result
    }
    async findByCategorySlug(slug){
        const options = this.#model.aggregate([
            {
                $lookup : {
                    from: "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category"
                }
            },
            {
                $unwind : "$category"
            },
            {
                $addFields : {
                    categorySlug : "$category.slug",
                    categoryName : "$category.name",
                    categoryIcon : "$category.icon",
                }
            },
            {
                $project : {
                    __v : 0,
                    category : 0
                }
            },
            {
                $match : {
                    categorySlug : slug
                }
            }
        ])
        return options
    }
    async create(optionDto){
        const category = await this.#categoryService.checkExistById(optionDto.category)
        optionDto.category = category._id
        optionDto.key = slugify(optionDto.key,{replacement : "_", lower : true ,trim : true})
        await this.checkExistByKeyAndCategoryId(optionDto.key, category._id)
        if(optionDto?.enum && typeof optionDto.enum === "string"){
            optionDto.enum = optionDto.enum.split(",")
        }else if(!Array.isArray(optionDto.enum)) optionDto.enum = []
        const option = await this.#model.create(optionDto)
        return option
    }
    async checkExistByKeyAndCategoryId(key,category){
        const result = await this.#model.findOne({key, category})
        if(result) throw new createHttpError.Conflict(OptionMessage.AlreadyExistSlug)
        return null
    }
    async update(id, optionDto){
        const isExist = await this.checkExistById(id)

        if(optionDto?.category && isValidObjectId(optionDto?.category)){
            const category = await this.#categoryService.checkExistById(optionDto?.category)
            optionDto.category = category._id
        }else{
            delete optionDto?.category
        }

        if(optionDto?.slug){
            optionDto.key = slugify(optionDto.key,{replacement : "_", lower : true ,trim : true})
            let categoryId = isExist.category
            if(optionDto?.category) categoryId = optionDto.category
            await this.checkExistByKeyAndCategoryId(optionDto.key, categoryId)
        }
        if(optionDto?.enum && typeof optionDto.enum === "string"){
            optionDto.enum = optionDto.enum.split(",")
        }else if(!Array.isArray(optionDto.enum)) delete optionDto.enum

        if(isTrue(optionDto.required)) optionDto.required = true
        else if(isFalse(optionDto.required)) optionDto.required = false
        else delete optionDto.required

        return await this.#model.updateOne({_id : id},{$set : optionDto})
    }
    async checkExistByKeyAndCategoryId(key,category){
        const result = await this.#model.findOne({key, category})
        if(result) throw new createHttpError.Conflict(OptionMessage.AlreadyExistSlug)
        return null
    }
    async checkExistById(id){
        const result = await this.#model.findOne({_id : id})
        if(!result) throw new createHttpError.NotFound(OptionMessage.NotFound)
        return result
    }
}

module.exports = new OptionService