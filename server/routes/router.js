const express = require("express");
const route = express.Router();
const services=require('../services/render')
const controller=require('../controller/controller')

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
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);
route.post('/api/signup',controller.createUser);
route.post('/api/signin',controller.signUser);
// route.get('/api/signup',controller.getUser)


module.exports=route
