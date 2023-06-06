const express = require("express")
const { postModel } = require("../model/post.model")
const { authentication } = require("../middleware/authentication")

const postRouter = express.Router()

postRouter.get("/api/posts",async(req,res)=>{
    try{
        const posts = await postModel.find()
        res.send({
            "msg":"all posts below",
            posts
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.post("/api/posts",authentication,async(req,res)=>{
    const { text,image,createdAt,userid} = req.body
    try{
        const post = new postModel({
            text,image,createdAt,user:userid
        })
        post.save()
        res.send({
            "msg":"post added",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.patch("/api/posts/:id",authentication,async(req,res)=>{
    const body = req.body
    const {id} = req.params
    try{
        const post = await postModel.findByIdAndUpdate(id,body)
    
        res.send({
            "msg":"post updated",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.delete("/api/posts/:id",authentication,async(req,res)=>{
    const body = req.body
    const {id} = req.params
    try{
        const post = await postModel.findByIdAndDelete(id)
    
        res.send({
            "msg":"post deleted",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.post("/api/posts/:id/like",authentication,async(req,res)=>{
    const body = req.body
    const {id} = req.params
    try{
        const post = await postModel.findById(id)
        post.likes.push(body.userid)
        await postModel.findByIdAndUpdate(id,post)
        res.send({
            "msg":"post liked",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.post("/api/posts/:id/comment",authentication,async(req,res)=>{
    const {text,userid} = req.body
    const {id} = req.params
    try{
        const post = await postModel.findById(id)
        const obj={
            user:userid,
            text:text,
            createdAt:new Date()
        }
        post.comments.push(obj)
        await postModel.findByIdAndUpdate(id,post)
        res.send({
            "msg":"comment added",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

postRouter.get("/api/posts/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const posts = await postModel.findById(id)
        res.send({
            "msg":"post down below",
            posts
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports= {
    postRouter
}