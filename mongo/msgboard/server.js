var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session")
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var mongoose = require('mongoose')
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/basic_mongoose')
mongoose.Promise = global.Promise;

app.use(session({
    secret: "dankmemesareneverdankenough",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 160000}
}))

app.use(flash());
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Comment must have an author"], minlength: [1, "Name must have at least 1 characters"]},
    content: {type: String, required: [true, "Comment can not be empty"]}
  }, {timestamps: true})
const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Message must have an author"], minlenght: [3, "Name must be at least 1 characters"]},
    content: {type: String, required: [true, "Message can not be empty"]},
    comments: [CommentSchema]
  }, {timestamps: true})

mongoose.model('comment', CommentSchema); // We are setting this Schema in our Models as 'User'
var comment_ = mongoose.model('comment')
mongoose.model('message', MessageSchema); // We are setting this Schema in our Models as 'User'
var msgvar = mongoose.model('message')

app.get('/', function(req, res) {
    msgvar.find({}, function(err, msgs) {
        if (err){
            console.log("There was an error")
            
        }
        else{
            console.log(msgs)
            res.render('index', {msgs: msgs});
        }
    })
})

app.post('/messages', function(req, res) {
    console.log("POST MSG DATA", req.body);
    var m = new msgvar(req.body);
    m.save(function(err){
        if(err){
            console.log("Post Error", err);
            for(var key in err.errors){
                req.flash('msg_error', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    });
})

app.post('/comments', function(req, res) {
    console.log("POST COMMENT DATA", req.body);
    var c = new comment_(req.body);
    c.save(function(err){
        if(err){
            console.log("Comment Error", err);
            for(var key in err.errors){
                req.flash('cmt_error', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {  
            msgvar.findOneAndUpdate({_id: req.body.msgid}, {$push: {comments: c}}, function(err, data){
                if(err){
                    console.log("Msg Update Error", err);
                    for(var key in err.errors){
                        req.flash('cmt_error', err.errors[key].message);
                    }
                    res.redirect('/');
                }
                else {
                    console.log("##############Update Msg Complete")
                    res.redirect('/');
                }
            })
        }
    });
})

// msgvar.findOneAndUpdate({_id: req.params.id}, {$push: {comments: data}}, function(err, data){
//     if(err){
//         console.log("Msg Update Error", err);
//         for(var key in err.errors){
//             req.flash('cmt_error', err.errors[key].message);
//         }
//         res.redirect('/');
//     }
//     else {

//         res.redirect('/');
//     }
// })
// res.redirect('/');




app.listen(8000, function() {
    console.log("listening on port 8000");
})
