const autoBind = require("auto-bind");
const postService = require("./post.service");
const PostMessage = require("./messages/post.messages");
const httpCodes = require("http-codes");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const dotenv = require("dotenv");
const { removeFromObject } = require("../../common/utils/function");
const { getMapAddress } = require("../../common/utils/http");
const utf8 = require("utf8");
const authService = require("../auth/auth.service");
dotenv.config()

class PostController{
    #service
    #categoryModel
    #userService
    success_message;
    constructor(){
        autoBind(this)
        this.#service =postService
        this.#categoryModel = CategoryModel
        this.#userService = authService
    }
    async createPostPage(req,res,next){
        try {
            let {slug}= req.query
            let match = {
                parent : null
            }
            let showBack = false
            let options, category
            if(slug){
                slug = slug.trim()
                category = await this.#categoryModel.findOne({slug})
                if(!category) throw new createHttpError.NotFound(PostMessage.NotFound)
                options = await this.#service.checkExistOption(category._id)
                match = {
                    parent : category._id
                }
                showBack = true
            }
            const categories = await this.#categoryModel.aggregate([
                {
                    $match : match
                }
            ])  
            res.render("./pages/panel/create-post.ejs",{
                categories,
                category :category?._id.toString(),
                showBack,
                options
            })
        } catch (error) {
            next(error)
        }
    }
    async create(req,res,next){
        try {
            const userId =req.user._id
            const images = req?.files?.map(image=> image?.path?.slice(7))
            const {title_post : title , description : content, lat,lng, category, amount} = req.body
            // const {province, city, region : district, address} =  await getMapAddress(lat, lng)
            // for(let item in [province, city, district, address]){
            //     if(!item){
            //         item = "-"
            //     }
            // }
            const province = "-"
            const city = "-"
            const district = "-"
            const address = "-"
            const option = removeFromObject(req.body, ['title_post','description', 'lat', 'lng', 'category','images', 'amount'])
            // for (let key in option) {
            //     console.log(key);
            //     let value = option[key]
            //     delete option[key]
            //     key = utf8.decode(key)
            //     option[key] = value
            // }
            await this.#service.create({
                title,
                amount,
                userId,
                coordinate : [lat, lng],
                image : [],
                category : new Types.ObjectId(category),
                option,
                content,
                province ,
                city ,
                district,
                address,
                images
            })
            // return res.json({
            //     message : PostMessage.Created
            // })
            // res.render("./pages/panel/posts.ejs", {
            //     posts, 
            //     count : posts.length,
            //     success_message : PostMessage.Created,
            //     error_message : null
            // })
            await this.find(req,res,next)
            } catch (error) {
                next(error)
            }
    }
    async find(req,res,next){
        try {
            const posts = await this.#service.find(req.user._id)
            res.render("./pages/panel/posts.ejs", {
                posts, 
                count : posts.length,
                success_message : this.success_message,
                error_message : null
            })
            this.success_message = null
        } catch (error) {
            next(error)
        }
    }
    async remove(req,res,next){
        try {
            const {id} = req.params
            await this.#service.remove(id)
            this.success_message = PostMessage.Deleted
            res.redirect("/post/my")
        } catch (error) {
            next(error)
        }
    }
    async showPost(req, res, next){
        const { id } = req.params
        const post = await this.#service.checkExistPost(id)
        res.locals.layout = "./layouts/website/main.ejs" 
        res.render("./pages/home/post.ejs",{
            post
        })
    }
    async postList (req, res, next) {
        try {
            const query = req.query;
            const posts = await this.#service.findAll(query);
            res.locals.layout = "./layouts/website/main.ejs";
            res.render("./pages/home/index.ejs", {
                posts
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController