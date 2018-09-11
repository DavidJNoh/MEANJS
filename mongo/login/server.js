var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const flash = require('express-flash');
app.use(flash());

var session = require("express-session")
app.set('trust proxy', 1) 
app.use(session({
    secret: "dankmemesareneverdankenough",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 160000}
}))

var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

require('./server/models/usermodel.js')
require('./server/config/routes.js')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
})