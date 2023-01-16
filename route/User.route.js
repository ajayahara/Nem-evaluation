const express=require("express");
const { UserModel } = require("../model/User.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const UserRouter=express.Router();
UserRouter.post("/register",async (req,res)=>{
 const {name,email,gender,password}=req.body;
try {
    const users=await UserModel.find({email})
    if(users.length>0){
        res.send({"msg":"You Have Already Registered"})
    }else{
        bcrypt.hash(password,5,async (err,encrypt_pass)=>{
            if(err){
                res.send({"msg":"Error While Registering"});
            }else{
                const new_user=new UserModel({name,email,gender,password:encrypt_pass});
                await new_user.save();
                res.send({"msg":"Registered Successfully"})
            }
        })
    }
} catch (error) {
    res.send({"msg":"Error While Registering"});
    console.log(error)
}
})
UserRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
   try {
    const user=await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(!result){
               res.send({"err":"Invalid Credential"});
            }else{
                const token=jwt.sign({userId:user[0]._id},process.env.KEY)
                res.send({"msg":"Login Successful",token:token})
            }
        })
    }else{
      res.send({"err":"No user found"});
    }
   } catch (error) {
    
   } 
})

module.exports={
    UserRouter
}
// {
//     "name":"Ajaya",
//   "email": "abak00350@gmail.com",
//   "gender": "male",
//   "password": "Ajaya@12"
// }