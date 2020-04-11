const passport = require('passport');
const {authorArr} = require('../../query');
module.exports = app => {
    app.get('/authors', (req, res, next)=>{
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
                        const resp = await authorArr();
                        res.send(JSON.stringify(resp));
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
