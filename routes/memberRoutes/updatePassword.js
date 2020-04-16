const passport = require('passport');
const {changePassword} = require('../../queries/memberQueries');
module.exports = app => {
    app.put('/updatePass', (req, res, next)=>{
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
                    if(user.status!==null){
                        const {oldPassword, newPassword} = req.body;
                        if(user.password===oldPassword){
                           const update = await changePassword(user.email, newPassword);
                           res.send(update);
                        }
                        else{
                            res.send("ძველი პაროლი არაა სწორი");
                        }
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
