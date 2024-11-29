const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    category : {type : Types.ObjectId , required : true , ref : "Category"},
    title : {type : String , required : true},
    amount : {type : String , required : true},
    userId : {type : Types.ObjectId , required : true},
    content : {type : String , required : true},
    province : {type : String , required : true},
    city : {type : String , required : true},
    district : {type : String , required : true},
    address : {type : String , required : true},
    coordinate : {type : [Number] , required : true},
    images : {type : [String] , required : false, default : []},
    option : {type : Object , default : {}},
},{timestamps : true})
const postModel = model("post", PostSchema)

module.exports = postModel
