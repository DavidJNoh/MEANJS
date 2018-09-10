var express= require("express");
var app = express();
var session = require("express-session")
var bodyParser = require('body-parser')
const axios = require('axios');

const server = app.listen(8000);
const io = require('socket.io')(server);

app.use(session({
    secret: "dankmemesareneverdankenough",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 160000}
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');



app.get('/', function(req, res){
    res.render('index', {})
})

var chat = [{name:"DINGLE", msg:"Test"}];

io.on('connection', function (socket) { 
    socket.on('new_user', function (data) { 
        socket.emit('chat', {chat});
    });
    socket.on('new_chat', function (data) { 
        console.log("###########" +data.name + "#####" + data.content)
        chat.push({name:data.name, msg: data.content})
        io.emit('update_chat', {data});
    });
  });