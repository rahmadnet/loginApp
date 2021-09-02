const db = require('../models');
const bcrypt = require('bcryptjs');

const findUserByEmail = (emailInput) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const user = await db.User.findOne({
                where: {
                    email: emailInput
                }
            });
            if(!user){
                reject(`We can't find a user with the email "${emailInput}"`);
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

const comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isMatch = await bcrypt.compare(password, userObject.password);
            if (isMatch) resolve(true);
            else{
                resolve("The Password that you've entered is incoreect!");
            }
        } catch (error) {
            reject(error);
        }
    });
};  

const findUserById = (idInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: idInput
                }
            });
            if(!user) reject(`User not found by the id: ${idInput}`);
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    findUserByEmail,
    comparePassword,
    findUserById
};