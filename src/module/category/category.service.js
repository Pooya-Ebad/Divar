const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");
const CategoryMessage = require("./messages/category.message");
const { isValidObjectId, Types } = require("mongoose");
const { default: slugify } = require("slugify");
const OptionModel = require("../options/option.model");

class CategoryService{
    #model
    #optionModel
    constructor(){
        autoBind(this)
        this.#model = CategoryModel
        this.#optionModel = OptionModel
    }
    async find(){
        return this.#model.find({parent :{$exists : false}})
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#optionModel.deleteMany({category : id}).then(async ()=>{
            await this.#model.deleteMany({_id: id})
        })
    }
    async create(categoryDto){
        if(categoryDto?.parent && isValidObjectId(categoryDto.parent)){
            const ExistCategory = await this.checkExistById(categoryDto.parent)
            categoryDto.parent = ExistCategory._id
            categoryDto.parents = [
                ... new Set(
                        ([ExistCategory._id.toString()].concat(
                            ExistCategory.parents.map(id => id.toString())
                        )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if(categoryDto?.slug){
            categoryDto.slug = slugify(categoryDto.slug)
            await this.alreadyExistSlug(categoryDto.slug)
        }else{
            categoryDto.slug = slugify(categoryDto.name)
        }
        await this.#model.create(categoryDto)
    }
    async checkExistById(id){
        const category = await this.#model.findById(id)
        if(!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return category
    }
    async alreadyExistSlug(slug){
        const category = await this.#model.findOne({slug})
        if(category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExistSlug)
        return null
    }
}

module.exports = new CategoryService