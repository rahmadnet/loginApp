const express = require ('express');
const homepage = require ('../controller/homepage');
const auth = require('../validation/authValidation');
const initPassportLocal = require ('../controller/passportLocal');
const passport = require ('passport');
const authController = require ('../controller/auth');

//init passport-local 
initPassportLocal();

const router = express.Router();

const initAllWebRoutes = (app) => {
    //routes Home Page
    router.get("/",homepage.getHomePage);
    router.get("/users",authController.checkLoggedIn, homepage.getAdminPage);
    router.get("/all-users", authController.checkLoggedIn, homepage.getAllUsersPage);
    //routes register
    router.get("/register", homepage.getRegisterPage);
    router.post("/register",auth.validateRegister, homepage.handleRegister);
    //routes login
    router.get("/login",authController.checkLoggedOut, homepage.getLoginPage);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/log-out", authController.postLogOut);
    return app.use("/", router);
};

module.exports = initAllWebRoutes;