const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
//const User=require("./models/user")
const mongoose=require("mongoose")

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use((req, res, next) => {
//  User.findById("678f775d0d991d98f7890141")
//    .then(user => {
//      req.user = new User(user.name,user.email,user.cart,user._id)
//       next();
//     })
//    .catch(err => console.log(err));
  
//});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.a)
  .then(result =>{
    app.listen(3001)
    console.log("port is running")
  })
  .catch(err =>{
    console.log(err)
  })