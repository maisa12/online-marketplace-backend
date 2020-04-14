const passport = require('passport');
const {createAd} = require('../../query');
module.exports = app => {
    app.post('/newAd', (req, res, next)=>{
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
                        const {name, category, description, picture, price} = req.body;
                        const resp = await createAd(name, user.id, category, description, picture, price, false);
                        res.send(resp);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
