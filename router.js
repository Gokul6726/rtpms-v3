var express = require("express");
var router = express.Router();

const  credential = {
    username : "admin",
    password : "admin"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.username == credential.username && req.body.password == credential.password){
        req.session.user = req.body.username;
        res.redirect('/route/dashboard');
        // res.end("Login Successful...!");
    }else{
        // res.end("Invalid Username/password")
        res.render('base', { title: "Express", logout : "Invalid Username/Password"})
    }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {title: "Dashboard", user : req.session.user})
    }else{
        res.send("Unauthorize User")
        
    }
})

router.get('/patient', (req, res) => {
    if(req.session.user){
        res.render('patient', {title: "Patient logs", user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/stats', (req, res) => {
    if(req.session.user){
        res.render('stats', {title: "Stats", user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;