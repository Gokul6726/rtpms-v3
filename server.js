const express = require('express');
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const session = require("express-session");
const{v4:uuidV4} = require("uuid");

const router = require("./router.js");


const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');
//load static assets
app.use("/static",express.static(path.join(__dirname,'public')))
// app.use("/assets", express.static(path.join(__dirname,'public/assets')))
// app.use("/script", express.static(path.join(__dirname,'public/script')))

app.use(session({
    secret: uuidV4(),//'secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router);

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Login"});
})

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:3000")});