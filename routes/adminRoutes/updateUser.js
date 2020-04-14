const passport = require('passport');
const {userUpdate} = require('../../queries/adminQueries');
module.exports = app => {
    app.put('/update/user/:id', (req, res, next)=>{
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
                    if(user.status==="admin"){
                        const {name, lastname, email, status, phoneNumber, password, id} = req.body;
                        const usUp = await userUpdate(name+"%"+lastname, email, phoneNumber, status, password, id);
                        res.send(usUp);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
