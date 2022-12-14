const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection')
const cors = require("cors")

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],
};


const app = express();
app.use(cors(corsOpts));
app.options('*', cors())

//It is present in root direcctory so don't need to give any relative path as second argument
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT;

//log requests
app.use(morgan("tiny"));

//available upload static folder publically
app.use('/uploads',express.static('uploads'))

//mongodb connection
connectDB();

//parse request to body-parser
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// });

//set view engine
app.set("view engine", "ejs");

//load assests
app.use('/css', express.static(path.resolve(__dirname, 'assests/css')))
// css/style.css
app.use('/js', express.static(path.resolve(__dirname, 'assests/js')))
//This is the default rout means localhost:3000 and when the url will match with root route then this call back function will  execute
// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.get("/add-user", (req, res) => {
//   res.render("add_user");
// });

// app.get('/update-user',(req,res)=>{
//   res.render('update_user')
// })

//load assests
app.use('/', require('./server/routes/router'))
//we are going to listen in all these in 3000 port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
