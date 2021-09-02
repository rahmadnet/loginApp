const db = require('../models');
const bcrypt = require('bcryptjs');

// Store hash in your password DB.
let createNewUser = (user) =>{
    return new Promise(async (resolve, reject) => {
        try {
            // check user`s email is ex ist before?
            // return true if the email already exist in the database
            const isEmailExist = await checkEmaliUser(user);
            if(isEmailExist){
                reject(`This email "${user.email}" has already exist. Please choose an other email !`);
            } else{
                // hash the user`s password 
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = await bcrypt.hashSync(user.password, salt);
                //update the user`s password
                user.password = hashPassword;
                // create a new user
                await db.User.create(user);
                resolve("done!");
            }
        } catch (error) {
            reject(error)
        }
    });
};

const checkEmaliUser = (userCheck) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const currentUser = await db.User.findOne({
                where: {
                    email: userCheck.email
                }
            });
            if(currentUser) resolve(true);
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { createNewUser };