const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModel } = require("../model/user.model")
const { authentication } = require("../middleware/authentication")
const userRouter = express.Router()

userRouter.post("/api/register",async(req,res)=>{
    const { name,email,password,dob,bio} = req.body
    try{
        bcrypt.hash(password,3,async(err,hashed)=>{
            const user = new userModel({name,email,password:hashed,dob,bio})
            await user.save()
            res.status(201).send({
                "msg":"successfully registered",
                user
            })
        })
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/api/login",async(req,res)=>{
    const { email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({userid:user._id},"masai",{expiresIn:"3h"})
                    res.status(201).send({
                        "msg":"successfully loggedin",
                        token
                    })
                }
                else{
                    res.send({
                        "msg":"wrong password"
                    })
                }
            })
        }
        else{
            res.send({
                "msg":"wrong email"
            })
        }  
        
    }
    catch(err){
        console.log(err)
    }
}) 

userRouter.get("/api/users",async(req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({
            "msg":"all users down below",
            users
        })
    }
    catch(err){
        console.log(err)
    }
})

userRouter.get("/api/users/:id/friends",async(req,res)=>{
    const {id}=req.headers
    try{
        const user = userModel.findById(id)
        if(user){
            res.status(200).send({
                "msg":"all friends of the user down below",
                "friends":user.friends
            })
        }
        else{
            res.send({
                "msg":"user dont exist"
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/api/users/:id/friends",authentication,async(req,res)=>{
    const {id}=req.params
    const body = req.body
    try{
        const user = await userModel.findById(id)
        if(user){
            user.friendRequests.push(body.userid)
            await userModel.findByIdAndUpdate(id,user)

            res.status(200).send({
                "msg":"friedn request sent",
                "friends":user
            })
        }
        else{
            res.send({
                "msg":"user dont exist"
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

userRouter.put("/api/users/:id/friends/:friendId",authentication,async(req,res)=>{
    const {id}=req.params
    const {friendId}=req.params
    const body = req.body
    try{
        const user = await userModel.findById(id)
        if(user){
            user.friends.push(friendId)
            let newarr=user.friendRequests.filter((elem)=>{
                return elem!=friendId
            })
            user.friendRequests=newarr
            await userModel.findByIdAndUpdate(id,user)

            res.status(200).send({
                "msg":"friedn request accepted",
                "friends":user
            })
        }
        else{
            res.send({
                "msg":"user dont exist"
            })
        }
    }
    catch(err){
        console.log(err)
    }
})


module.exports={
    userRouter
}