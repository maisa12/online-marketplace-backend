const User = require('../models/user');
const passport = require('passport');

module.exports = app =>{
    app.post('/register', (req, res, next)=>{
       
        passport.authenticate('register', (err, user, info)=>{
            if(err){
                console.log(err);
            }
            if(info!==undefined){
                console.log(info.message)
                res.send({
                    register: false, 
                    message: info.message
                })
            }else{
                const {name, lastname, email, phoneNumber, password} = req.body;
                User.create({
                    name_lastname: name+"%"+lastname,
                    email: email,
                    phone_number: phoneNumber,
                    status: "member",
                    password: password
               });
               res.send({
                register: true, 
                message: "successful"
            });
            }

        })(req, res, next)
    })
}