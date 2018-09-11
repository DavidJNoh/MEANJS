
const users = require('../controllers/users.js')
module.exports = function(app){
    app.get('/', users.index)

    app.post('/register_process', users.register)

    app.post('/login_process', users.login)

}
