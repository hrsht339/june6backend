const mongoose = require("mongoose")

// const userPSchema=mongoose.Schema({
//     postId:String
// })

// const userFSchema=mongoose.Schema({
//     friendId:String
// })

// const userFRSchema=mongoose.Schema({
//     friendRId:String
// })
const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        dob: Date,
        bio: String,
        posts: [],
        friends: [],
        friendRequests: []
})

const userModel = mongoose.model("user",userSchema)


module.exports={userModel}