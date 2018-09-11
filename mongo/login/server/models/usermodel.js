var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    first_name: {type: String, required:[true, "*First name must not be empty"], minlength:[2, "First name must have at least 1 characters"]},
    last_name: {type: String, required:[true, "*Last name must not be empty"] ,minlength:[2, "last_name must have at least 1 characters"], max:150},
    email: {type: String, required:[true, "*Email must not be empty"] ,minlength:[1, "Email must have at least 1 characters"], unique:[true, "Email already taken"]},
    password: {type: String, required:[true, "*Password must not be empty"] ,minlength:[1, "Password must have at least 1 characters"], max:150},
},{timestamps: true})
UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);
