const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    jwtSecret = require('./jwtConfig');

passport.use(
    'register',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done)=>{
        try{
        User.findOne({
            where: {
            email: email
        },
        raw: true
    }).then(user=>{
        if(user!==null){
            return done(null, false, {message: "მოცემული ელ-ფოსტით მომხმარებელი უკვე დარეგისტრირებულია"})
        }
        else{
           done(null, user)
        }
    }) 
    }
    catch(err){
        done(err);
    }
    }
    )
);
passport.use(
    'login',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        try{
        User.findOne({
            where: {
                email: username
            },
            raw: true
        }).then(user=>{
            if(user===null){
                return done(null, false, {message: 'ელ-ფოსტა ან პაროლი არ არის სწორი'})
            } else{
                if(user.password===password){
                    return done(null, user)   
                }
                else{
                    return done(null, false, {message: 'ელ-ფოსტა ან პაროლი არ არის სწორი'})
                }
            }
        })
        }
        catch(err){
            done(err)
        }
    }
    )
);
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};
passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done)=>{
        try{
        User.findOne({
            where: {
                email: jwt_payload.id
        }
    }).then(user=>{
        if(user){
            console.log("user found in db");
            done(null, user);
        }
        else{
            console.log("can't found user in db");
            done(null, false)
        }
    })
    }
    catch(err){
        done(err)
    }
    })
)