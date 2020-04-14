const passport = require('passport');
const {catUpdate} = require('../../queries/adminQueries');
module.exports = app => {
    app.put('/update/category/:id', (req, res, next)=>{
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
                        const {name,  position,  slug, id} = req.body;
                        await catUpdate(name,  position,  slug, id)
                         res.send("success");
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
