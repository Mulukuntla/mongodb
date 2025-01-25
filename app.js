const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User=require("./models/user")
const mongoose=require("mongoose")

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("6794bbb746ad80d8cd13a4c0")
    .then(user => {
      req.user = user
       next();
     })
    .catch(err => console.log(err));
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.a)
  .then(result =>{
    User.findOne().then(user =>{
      if(!user){
        const user=new User({
          name:"Max",
          email:"max@test.com",
          cart:{
            items:[]
          }
    
        })
        user.save()

      }
      

    })
    
    app.listen(3001)
    console.log("port is running")
  })
  .catch(err =>{
    console.log(err)
  })