const passport = require('passport');
const {deleteItem} = require('../../queries/adminQueries');
module.exports = app => {
    app.delete('/delete/:type/:id', (req, res, next)=>{
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
                        await deleteItem(req.params.type, req.params.id);
                        res.send("deleted");
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
