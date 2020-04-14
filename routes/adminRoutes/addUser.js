const passport = require('passport');
const {createUser} = require('../../queries/adminQueries');
module.exports = app => {
    app.post('/add/user', (req, res, next)=>{
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
                        const {name, lastname, email, status, phoneNumber, password} = req.body;
                        const response = await createUser(name+"%"+lastname, email, phoneNumber, status, password);
                        res.send(response);
                    }
                   else{
                        res.send("Invalid request");
                   }
            }
        })(req, res, next)
    })
}
