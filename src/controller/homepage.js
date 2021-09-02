const userService = require('../service/userService');
const {validationResult} = require('express-validator');

const getHomePage = (req, res) => {
    return res.render("homepage.ejs");
};
// const getNewUserPage = (req, res) => {
//     return res.render("createUser.ejs");
// }

// const createNewUser = async (req, res) => {
//     const user = req.body;
//     await userService.createNewUser(user);
//     return res.redirect("/");
// };

const getRegisterPage = async (req, res) =>{
    const form = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
    };
    return res.render("auth/register.ejs",{
        errors: req.flash("errors"),
        form: form
    });
};

const handleRegister = async (req, res) => {
    //keep the old input value
    const form = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
    };

    // validate input fields
    //create an empty array to save validation errors
    const errorsArr = [];
    const validationError = validationResult(req);
    if(!validationError.isEmpty()){
        const errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.render("auth/register.ejs",{
            errors: req.flash("errors"),
            form: form
        });
    }
    // create a new user
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            comfirmPassword: req.body.comfirmPassword,
            createdAt: Date.now(),
        };
        await userService.createNewUser(user);
        return res.redirect("/");
    } catch (error) {
        //showing the errors message with Flash
        req.flash("errors", error);
        return res.render("auth/register.ejs",{
            errors: req.flash("errors"),
            form: form
        });
    }
};

const getLoginPage = async (req, res) => {
    return res.render("auth/login.ejs",{
        errors: req.flash("errors")

    });
};

const getAdminPage = async (req, res) => {
    return res.render("users/main.ejs")
};

const getAllUsersPage = async (req, res) => {
    return res.render("users/manageUsers.ejs");
};

module.exports = { 
    getHomePage,
    getRegisterPage,
    getLoginPage,
    handleRegister,
    getAdminPage,
    getAllUsersPage
 };