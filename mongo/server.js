var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var mongoose = require('mongoose')
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-as-promised');

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
    name: {type: String, required: true, minlength:1},
    age: {type: Number, min:1, max:150}
},{timestamps: true})
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
            res.render('index', {users: users});
        }
    })
    
})
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, age: req.body.age});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong');
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        res.redirect('/');
        }
    })
})

//reference

// var userInstance = new User()
// userInstance.name = 'Andriana'
// userInstance.age = 29
// userInstance.save(function(err){
//     if(err) {
//         console.log('something went wrong');
//         } 
//     else { // else console.log that we did well and then redirect to the root route
//         console.log('successfully added a user!');
//         }
// })


// userInstance.findOne({age = 29}, function(err, user) {
//     console.log(user)
//     // Retrieve 1 object
//     // This code will run when the DB is done attempting to retrieve 1 record.
//    })

// User.remove({}, function(err){
//  // This code will run when the DB has attempted to remove all matching records to {}
// })

// User.remove({_id: 'insert record unique id here'}, function(err){
//  // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
// })

// // ...update any records that match the query
// User.update({name:'Andriana'}, {$push: {pets: {name: 'Skippy', type: 'cactus' }}}, function(err){
//  // This code will run when the DB has attempted to update the matching record.
// })
// // another way to update a record
// userInstance.find({name: 'Andriana'}, function(err, user){
//     user.name = 'Andri';
//     user.pets.push({name: 'Skippy', type: 'cactus'});
//     user.save(function(err){
//      // if save was successful awesome!
//  })
// })

// app.post('/users', function (req, res){
//     var user = new User(req.body);
//     user.save(function(err){
//         if(err){
//             // if there is an error upon saving, use console.log to see what is in the err object 
//             console.log("We have an error!", err);
//             // adjust the code below as needed to create a flash message with the tag and content you would like
//             for(var key in err.errors){
//                 req.flash('registration', err.errors[key].message);
//             }
//             // redirect the user to an appropriate route
//             res.redirect('/');
//         }
//         else {
//             res.redirect('/users');
//         }
//     });
// });


//session

// app.post('/sessions', (req, res) => {
//     console.log(" req.body: ", req.body);
//     User.findOne({email:req.body.email, password: req.body.password}, (err, user) => {
//         if (err) {
//             // Code...
//         }
//         else {
//             // Code...
//     		req.session.user_id = user._id;
// 		req.session.email = user.email;
//         }
//     })
// })

//bcrypt stuff

// bcrypt.hash('password_from_form', 10)
// .then(hashed_password => {
	 
// })
// .catch(error => {
	 
// });

// bcrypt.compare('password_from_form', 'stored_hashed_password')
// .then( result => {
	 
// })
// .catch( error => {
	 
// })





app.listen(8000, function() {
    console.log("listening on port 8000");
})
