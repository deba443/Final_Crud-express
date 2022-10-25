const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    profilepicture:{
        type:String,
        required:true,
        // public_id:{
        //     type:String,
        //     required:true
        // },
        // url:{
        //     type:String,
        //     required:true
        // }
    }
},{timestamps:true});
const User=mongoose.model('user',userSchema);
module.exports=User;