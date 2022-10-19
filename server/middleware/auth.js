const jwt=require("jsonwebtoken")
const SECRET_KEY="NOTESAPI"
const auth=(req,res,next)=>{
    try{
        let token=req.headers.authorization
        // console.log(token)
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,SECRET_KEY);
            req.userID=user.id;
        }
        else{
            return res.status(401).json({message:"Unauthorised User"});
        }
        next();
    }
    catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthorised error"});
    }
}

module.exports=auth;