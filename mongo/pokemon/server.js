var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(__dirname+'/public/dist/public'));

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }

var UserSchema = new mongoose.Schema({
    name: {type: String, required:true},
    },{timestamps: true})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

app.listen(8000, function() {
    console.log("listening on port 8000");
})