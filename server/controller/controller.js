const { send } = require("process");
let Userdb = require("../model/model");
let User = require("../model/user")
const bcrypt = require('bcrypt')
const SECRET_KEY = "NOTESAPI"
const jwt = require("jsonwebtoken")
const multer = require("multer");
const { fileLoader } = require("ejs");
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary').v2



// exports.upload=async (req,res)=>{
// const {file}=req.body;
// try{
//   console.log(req.body)
//   const existingFile=await User.findOne{{email:email}}

// }
// catch(err){
//   console.log(err)
//   return res.status(500).json({ message: 'Something went wrong' })
// }
// }


// const result = cloudinary.uploader.upload('uploads/16666681240362017-12-08T10:04:01.873Zchristmas.jpg',{
//   use_filename:true,
//   folder:'images',
//   unique_filename:false,
// },(err,image)=>{
//   if(err){
//     console.log(err)
//   }
//   console.log("file uploaded")
//   console.log(image)

// })

exports.createUser = async (req, res) => {
  //Existing user check
  //Hashed password
  //User creation
  //Token generate
  // if(req.body==={}){
  //   return
  // }
  const { username, email, password } = req.body;
  // console.log(req.file)
  try {

    // return res.status("OK")
    // console.log(req.body)
    // console.log(req.file)
    //upload image to cloudinary
    // console.log('deba')

    // console.log('deba')
    // return res.json(result)
    // console.log(result)
    // console.log(req.file.path)
    // res.json(resul,deba)
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const imageURL = await cloudinary.uploader.upload(req.file.path,{
      use_filename:true,
      folder:'images',
      unique_filename:false,
    },(err,image)=>{
      if(err){
        console.log(err)
      }
      console.log("file uploaded")
      console.log(image)
    
    })
    const result = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
      // profilepicture: {
      //   public_id: result.public_id,
      //   url: result.secure_url
      // }
      profilepicture:imageURL.url
    })
    console.log(result)
    return res.status(201).json({ user: result })
  }
  catch (err) {
    // console.log("deba")
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong' })
  }


}

exports.signUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  const { email, password, profilepicture } = req.body;
  // console.log(profilepicture)
  try {
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
      return res.status(404).json({ message: 'user not found' })
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password)
    // console.log(req.body,existingUser.password,matchPassword,hashedPassword)
    if (!matchPassword) {
      return res.status(404).send({ message: "Invalid credential" });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, { expiresIn: '20d' })
    // console.log(existingUser)
    return res.status(201).send({ user: existingUser, token: token })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "something went wrong" });

  }

}

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  // console.log(req.body)
  // return res.send("OK")
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //save user in database
  // return res.send("OK")
  user
    .save(user)
    .then((data) => {
      res.send(data);
      // res.redirect("/add-user");
    })
    .catch((err) => {
      // console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

//retrive and return all users/retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retriving user with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error occured while retriving user information",
          });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to update can not be empty" });
    return;
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}.Maybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//Delete a user with specified user is in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with ${id}.Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete User with id=" + id,
      });
    });
};
