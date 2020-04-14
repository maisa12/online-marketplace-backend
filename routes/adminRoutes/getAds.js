const passport = require('passport');
const {adList} = require('../../queries/adminQueries');
module.exports = app => {
    app.get('/ads', (req, res, next)=>{
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
                        const resp = await adList();
                        res.send(JSON.stringify(resp));
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
