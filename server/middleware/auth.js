const jwt=require("jsonwebtoken")
const SECRET_KEY="NOTESAPI"
const auth=(req,res,next)=>{
    try{
        let token=req.headers.authorization
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,SECRET_KEY);
            req.userID=user.id;
        }
        else{
            res.status(401).json({message:"Unauthorised User"});
        }
        next();
    }
    catch(err){
        console.log(err)
        res.status(401).json({message:"Unauthorised error"});
    }
}

module.exports=auth;