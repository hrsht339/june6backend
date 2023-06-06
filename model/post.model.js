const mongoose = require("mongoose")

// const likesSchema=mongoose.Schema({
//     userId:String
// })

// const userSchema=mongoose.Schema({
//           user: String,
//           text: String,
//           createdAt: Date
// })

const postSchema = mongoose.Schema({
        user: String,
        text: String,
        image: String,
        createdAt: Date,
        likes: [],
        comments: []
})

const postModel = mongoose.model("post",postSchema)

module.exports = {
    postModel
}