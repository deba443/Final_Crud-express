const axios=require('axios');
const { response } = require('express');


// exports.homeRoutes=(req,res)=>{
//     axios.post('http://localhost:8080/api/login').then

// }
// exports.homeRoutesGet=(req,res)=>{
//     axios.get('http://localhost:8080/api/login')
// }
// exports.sign_up=(req,res)=>{

// }


exports.indexRoutes=(req,res)=>{
    //make a get request to /api/users
    axios.get('http://localhost:8080/api/users').then(function(ressponse){
        // console.log(ressponse.data)
        res.render('index',{users:ressponse.data})
    }).catch(err=>{
        res.send(err)
    })
}

exports.add_user=(req,res)=>{
    res.render("add_user.ejs")
}

exports.update_user=(req,res)=>{
    axios.get("http://localhost:8080/api/users",{params:{id:req.query.id}}).then(function(userdata){
        res.render("update_user",{user:userdata.data})
    }).catch(err=>{
        res.send(err);
    })
}