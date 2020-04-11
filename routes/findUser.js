const passport = require('passport');

module.exports = app => {
    app.get('/findUser', (req, res, next)=>{
        passport.authenticate('jwt', (err, user, info) => {
            if(err){
                console.log(err);
            }
            if(info!==undefined){
                console.log(info.message);
                res.send({
                        auth: false, 
                        message: info.message
                    });
            }
            else{
                    res.status(200).send({
                        auth: true,
                        name: user.name_lastname,
                        email: user.email,
                        phone_number: user.phone_number,
                    })
            }
        })(req, res, next)
    })
}
