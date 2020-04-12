const passport = require('passport');

module.exports = app => {
    app.get('/usersInfo', (req, res, next)=>{
        passport.authenticate('jwt', async(err, user, info) => {
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
                    if(user.status==="member"){
                        var member ={
                            name: user.name_lastname, 
                            status: user.status,
                            email: user.email,
                            phone: user.phone_number
                        }
                        res.send(JSON.stringify(member));
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
