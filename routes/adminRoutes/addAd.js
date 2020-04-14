const passport = require('passport');
const {createAd} = require('../../queries/adminQueries');
module.exports = app => {
    app.post('/add/ad', async(req, res, next)=>{
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
                        const {name, author, category, description, picture, price, active} = req.body;
                        const response = await createAd(name, author, category, description, picture, price, active);
                        res.send(response);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
