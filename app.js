const express = require("express");
const path = require("path");

const app = express();

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1/web', {useNewUrlParser: true});
const port =5000;

// EXPRESS SPECIFIC STUFF
//app.use(express.static('static',option))
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    gender: String,
    date: Number,
    address: String,
    email: String,
   dance:String
  });
  const dance = mongoose.model('dance', contactSchema);

app.get('/', (req, res)=>{
    res.status(200).render('home');
})

app.get('/home', (req, res)=>{
    res.status(200).render("home");
})

app.get('/register', (req, res)=>{
     res.status(200).render("register");
})
app.get('/about', (req, res)=>{
    res.status(200).render("about");
})
app.get('/success', (req, res)=>{
    res.status(200).render("success");
})

app.post('/register', (req, res)=>{
    var myData = new dance(req.body);
    myData.save().then(()=>{
        res.status(200).render("success");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});
           // START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
 