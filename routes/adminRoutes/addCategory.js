const passport = require('passport');
const {createCategory} = require('../../queries/adminQueries');
module.exports = app => {
    app.post('/add/category', (req, res, next)=>{
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
                        const {name, position, slug} = req.body;
                        const response = await createCategory(name, position, slug);
                        res.send(response)
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
