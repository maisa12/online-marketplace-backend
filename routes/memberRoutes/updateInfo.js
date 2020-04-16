const passport = require('passport');
const {memeberInfoUpdate} = require('../../queries/memberQueries');
module.exports = app => {
    app.put('/updateInfo', (req, res, next)=>{
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
                        const {name, email, phone} = req.body;
                        const userUpdate = await memeberInfoUpdate(user.email, name, email, phone)
                        res.send(userUpdate);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
