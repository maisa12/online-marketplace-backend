const passport = require('passport');
const {memberAds} = require('../../query');
module.exports = app => {
    app.get('/userAds', (req, res, next)=>{
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
                        const resp = await memberAds(user.id);
                        res.send(JSON.stringify(resp));
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
