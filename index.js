require("dotenv").config()
const express=require("express");
const {connection}=require("./configs/db.js")
const cors=require("cors");
const { UserRouter } = require("./route/User.route.js");
const { PostRouter } = require("./route/Post.route.js");


const app=express();
app.use(cors());
app.use(express.json());
app.use("/users",UserRouter)
app.use("/posts",PostRouter)
app.listen(process.env.PORT,async ()=>{
    try{
        await connection;
        console.log(`App is running at port ${process.env.PORT} `);

    }catch(e){
        console.log(e)
    }
})



