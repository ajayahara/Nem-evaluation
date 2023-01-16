const jwt=require("jsonwebtoken");
const Authentication=(req,res,next)=>{
    const token=req.headers.authentication;
    console.log(token)
   jwt.verify(token,process.env.KEY,(err,decoded)=>{
    console.log(decoded)
    console.log(err)
    if(err){
        res.send(err)
    }
    if(decoded){
        req.body.id=decoded.userId
        next();
    }else{
        res.send({"msg":"Please Login"})
    }
   });   
}
module.exports={
    Authentication
}