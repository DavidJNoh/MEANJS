var express= require("express");
var app = express();
var session = require("express-session")
var bodyParser = require('body-parser')
const axios = require('axios');


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

app.get('/people', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get(url)
    .then(data => {
        // log the data before moving on! 
        console.log(data);
        // rather than rendering, just send back the json data!
        res.json(data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    })
});
    
// app.get("/", function (request, response){
//     if ( !request.session.count ){
//         request.session.count = 1;
//     }
//     else{
//         request.session.count += 1;
//     }
//     response.render('index', {session : request.session.count});
// })

// app.post('/add', function(request, response){
//     request.session.count += 1
//     response.redirect("/")
// })

// app.post('/clear', function(request, response){
//     request.session.count = -1
//     response.redirect("/")
// })

app.get('/', function(req, res){
    res.render('index')
})
app.post('/process', function(req, res){
    var data ={
        name: req.body.name,
        location: req.body.location ,
        language: req.body.language 
        
    }

    res.render("end", data)
})

app.listen(8000)