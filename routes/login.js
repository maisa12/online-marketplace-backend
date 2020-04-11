const User = require('../models/user'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    jwtSecret = require('../passportConfig/jwtConfig');

module.exports = app => {
    app.post('/login', (req, res, next)=>{
        passport.authenticate('login', (err, user, info) => {
            if(err){
                console.log(err);
            }
            if(info!==undefined){
                res.send({
                        auth: false, 
                        message: info.message
                    });
            }
            else{
                    const token = jwt.sign({id: user.email}, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        name: user.name_lastname,
                        status: user.status,
                        message: 'User found & logged in'
                    })
            }
        })(req, res, next)
    })
}
