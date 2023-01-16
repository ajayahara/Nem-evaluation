const { application } = require("express");
const express=require("express");
const { Authentication } = require("../middleware/Authentication.middleware");
const { PostModel } = require("../model/Post.model");

const PostRouter=express.Router();
PostRouter.use(Authentication)
PostRouter.get("/create",async (req,res)=>{
    try {
        const new_post=new PostModel(req.body)
        await new_post.save() 
        res.send({"msg":"New post created"})
    } catch (error) {
        res.send({"err":"Eroor in creating new post"})
    }
})
PostRouter.get("/",async (req,res)=>{
    const {id}=req.body;
    let posts
    if(req.query.device1=="MOBILE"&&req.query.device2=="PC"){
        posts=await PostModel.find({$or: [ {id,device:"MOBILE"}, {id,device:"PC"}]})
    }else if(req.query.device1=="MOBILE"){
        posts=await PostModel.find({id,device:"MOBILE"})
    }else if(req.query.device2=="PC"){
        posts=await PostModel.find({id,device:"PC"});
    }else{
        posts=await PostModel.find({id})
    }
    res.send(posts)
})
PostRouter.patch("/update/:postid",async (req,res)=>{
   const post_id=req.params.postid;
   const id=req.body.id
   const post=await PostModel.find({_id:post_id});
  try {
    if(post[0].id==id){
        await PostModel.findByIdAndUpdate({_id:post_id},req.body)
        res.send({"msg":"Updated The Post"})
   }else{
    res.send({"err":"You are not authorised"})
   }
  } catch (error) {
    res.send({"err":"Error While Updating"})
    console.log(error)
  }
})
PostRouter.delete("/delete/:postid",async (req,res)=>{
    const post_id=req.params.postid;
   const id=req.body.id
   const post=await PostModel.find({_id:post_id});
  try {
    if(post[0].id==id){
        await PostModel.findByIdAndDelete({_id:post_id})
        res.send({"msg":"Deleted The Post"})
   }else{
    res.send({"err":"You are not authorised"})
   }
  } catch (error) {
    res.send({"err":"Error While Deleting"})
    console.log(error)
  }
})



module.exports={
    PostRouter
}