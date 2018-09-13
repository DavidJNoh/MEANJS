const bcrypt = require('bcryptjs');
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
    index: function(req, res) {
        res.render('index');
    },
    register: function(req, res){
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
                    req.flash('reg_error', "Register Successful");
                    return res.redirect('/');
                }
            });
        })
        .catch(error => {
            for(var key in err.errors){
                req.flash('reg_error', "Bcrypt error");
            }
            res.redirect('/');
        });
    },

    login: function(req, res){
        console.log("######POSTDATA" , req.body)
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
    }
}
    
        
