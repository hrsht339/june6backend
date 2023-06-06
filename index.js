const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./route/user.route")
const { postRouter } = require("./route/post.route")

const app = express()

app.use(express.json())
app.use("/",userRouter)
app.use("/",postRouter)

app.listen(4500,async()=>{
    try{
        await connection 
        console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
    console.log("server connected")
})

