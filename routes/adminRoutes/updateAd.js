const passport = require('passport');
const {adUpdate} = require('../../queries/adminQueries');
module.exports = app => {
    app.put('/update/ad/:id', (req, res, next)=>{
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
                        const {name,  category,  description, picture, active, price}=req.body;
                        await adUpdate(name,  category,  description, picture, active, price, req.params.id)
                       res.send("success");
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
