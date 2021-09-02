const passport = require('passport');
const passportLocal = require('passport-local');
const loginService = require('../service/loginService');

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    //check login with the email and password input
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async(req, email, password, done) =>{
        try{
            //find user by the email address
            await loginService.findUserByEmail(email)
            //had a user ?
            .then( async (user)=>{
                    if(!user) return done(null, false, req.flash("errors","User not found!"));
                    
                    //compare the user's password
                    let message = await loginService.comparePassword(password, user);
                    //the password is match?
                    if(message === true){
                        return done(null, user, null);
                    }
                    else {
                        //return false with the error message
                        return done(null, false, req.flash("errors",message));
                    }
            })
            .catch(err =>{
                console.log(err);
                return done(null, false, req.flash("errors",err));
            });
        }catch(error){
            console.log(error)
            return done(null, false, error);
        }
    }
    
    ))
};
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=> {
    await loginService.findUserById(id).then(user => {
        console.log("run");
        console.log(user);
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});


module.exports = initPassportLocal;