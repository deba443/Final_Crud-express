const express = require("express");
const route = express.Router();
const services=require('../services/render')
const controller=require('../controller/controller')
const auth=require('../middleware/auth')
const multer=require("multer")
// const upload=multer({dest:'uploads/'})
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/',);
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
 const fileFilter=(req,file,cb)=>{
    //reject a file
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
    //accept a file
 }

const upload=multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*5
    },
    fileFilter:fileFilter,
})

/**
 * @description Root Route
 * @method GET
 */
// route.post("/",services.homeRoutes);
// route.post("/",services.homeRoutesGet);
// route.post("/sign-up",services.sign_up)

// route.post("/")

route.get("/",services.indexRoutes);

/**
 * @description add users
 * @method GET/add-user
 */
route.get("/add-user",services.add_user);

/**
 * @description update users
 * @method GET/update-users
 */
route.get("/update-user", services.update_user);



//API
route.post('/api/users',auth,controller.create);
route.get('/api/users',auth,controller.find);
route.put('/api/users/:id',auth,controller.update);
route.delete('/api/users/:id',auth,controller.delete);
route.post('/api/signup',upload.single('profilepicture'),controller.createUser)
route.post('/api/signin',controller.signUser);
// route.post('/api/users/upload',auth,controller.upload)
// route.get('/api/signup',controller.getUser)


module.exports=route;
