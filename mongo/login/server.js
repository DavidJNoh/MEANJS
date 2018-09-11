var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var mongoose = require('mongoose')
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');


var session = require("express-session")
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: "dankmemesareneverdankenough",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 160000}
}))

app.use(flash());


var UserSchema = new mongoose.Schema({
    first_name: {type: String, required:[true, "*First name must not be empty"], minlength:[2, "First name must have at least 1 characters"]},
    last_name: {type: String, required:[true, "*Last name must not be empty"] ,minlength:[2, "last_name must have at least 1 characters"], max:150},
    email: {type: String, required:[true, "*Email must not be empty"] ,minlength:[1, "Email must have at least 1 characters"], unique:[true, "Email already taken"]},
    password: {type: String, required:[true, "*Password must not be empty"] ,minlength:[1, "Password must have at least 1 characters"], max:150},
},{timestamps: true})
UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
   

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err){
            console.log("There was an error")
            
        }
        else{
            // console.log(users)
            res.render('index');
        }
    })
    // console.log(User)
    // res.render('index');
})

app.post('/register_process', function(req, res) {
    if(req.body.password.length == 0){
        req.flash('reg_error', "Password can not be empty");
        return res.redirect('/');
    }
    bcrypt.hash(req.body.password, 10)
    .then(hashed_ => {
        let userData = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashed_
        }
        var U = new User(userData);
        U.save(function(err){
            if(err){
                console.log("Register Error", err);
                for(var key in err.errors){
                    req.flash('reg_error', err.errors[key].message);
                }
                return res.redirect('/');
            }
            else {
                console.log("Registered #################")
                console.log(U)
                return res.redirect('/');
            }
        });
    })
    .catch(error => {
        for(var key in err.errors){
            req.flash('reg_error', err.errors[key].message);
        }
        res.redirect('/');
    });
})

app.post('/login_process', function(req, res) {
    if(req.body.password.length == 0){
        req.flash('log_error', "Password can not be zero");
        return res.redirect('/');
    }
    User.findOne({email: req.body.email}, function(err, attempt) {
        if (err){
            console.log("Log in Fail")
            req.flash('log_error', "Log in Fail");
            return res.redirect('/');
        }
        else{
            bcrypt.compare(req.body.password, attempt.password)
            .then( result => {
                if (result == true){
                    req.session.user_id = attempt._id;
                    req.session.email = attempt.email;
                    req.flash('log_error', "Log in Success");
                    console.log("#########Success")
                    return res.redirect('/');       
                }
                else{
                    req.flash('log_error', "Log in Fail");
                    return res.redirect('/');                    
                }
            })
            .catch( error => {
            req.flash('log_error', "Bcrypt Not Working");
            return res.redirect('/');            
            })
            
        }
    })
})



app.listen(8000, function() {
    console.log("listening on port 8000");
})