const {check} = require('express-validator');

const validateRegister = [
    check("email", "Invalid email!").isEmail().trim(),
    check("password", "Invalid password. Password must be at least 3 chars long")
    .isLength({min: 3}),
    check("comfirmPassword", "Password confirm does match password")
    .custom((value, {req})=>{
        return value === req.body.comfirmPassword
    })
];

module.exports = {
    validateRegister
};