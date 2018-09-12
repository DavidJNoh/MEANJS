var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }

var UserSchema = new mongoose.Schema({
    name: {type: String, required:true},
    },{timestamps: true})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

app.get('/', function(req, res){
    User.find({}, function(err, people){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: people})
        }
     })
})  

app.get('/new/:id', function(req, res){
    console.log(req.params.id)
    User.create({"name":req.params.id}, function(err, people){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            return;
        }
    })
})

app.get('/delete/:id', function(req, res){
    console.log(req.params.id)
    User.deleteOne({"name":req.params.id}, function(err, res){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
         }
        else {
            return;
        }
    })

})

app.get('/:id', function(req, res){
    console.log(req.params.id)
    User.findOne({"name":req.params.id}, function(err, people){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: people})
        }
     })

})

app.listen(8000, function() {
    console.log("listening on port 8000");
})