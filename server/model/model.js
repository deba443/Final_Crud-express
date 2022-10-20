const mongoose=require('mongoose');

let schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:String,
    status:String,
    // fileName:{
    //     type:File,
    // }
})

const Userdb=mongoose.model('userdb',schema);
module.exports=Userdb;