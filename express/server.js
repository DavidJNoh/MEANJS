// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
// console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
// console.log("Let's find out what app is", app);



app.use(express.static(__dirname + "/static"));

// app.get('/cars.html', function(request, response) {
// })
// app.get('/cats.html', function(request, response) {
//     response.send("<h1>Hello Express</h1>");
// })
// app.get('/form.html', function(request, response) {
//     response.send("<h1>Hello Express</h1>");
// })

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/cars", function (request, response){
    response.render('cars');
})
app.get("/cats", function (request, response){
    response.render('cats');
})
app.get("/cars/new", function (request, response){
    response.render('new');
})


// this is the line that tells our server to use the "/static" folder for static content
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})
