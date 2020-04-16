const passport = require('passport');
const {memberAdUpdate} = require('../../queries/memberQueries');
module.exports = app => {
    app.put('/update/:id', (req, res, next)=>{
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
                        const {name, category, description, picture, price} = req.body;
                        const resp = await memberAdUpdate(name, category, description, picture, price, req.params.id);
                        res.send(resp);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
