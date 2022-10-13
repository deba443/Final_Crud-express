const axios=require('axios');
const { response } = require('express');


exports.homeRoutes=(req,res)=>{
    //make a get request to /api/users
    axios.get('http://localhost:3000/api/users').then(function(ressponse){
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
    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}}).then(function(userdata){
        res.render("update_user",{user:userdata.data})
    }).catch(err=>{
        res.send(err);
    })
}