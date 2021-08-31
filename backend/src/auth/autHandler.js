const jwt = require('jsonwebtoken')
const Usermodel = require("../model/user.schema")
const bcrypt = require("mongoose-bcrypt")
require('dotenv').config()

const refreshTokens = []
exports.login = async (req, res, next) => {
    console.log('login: ');
    const { email, password } = req.body
    try {
        const user = await Usermodel.findOne({ email })
        if (!user) {
            throw new Error('User not found!')
        }
                
        const verified = await user.verifyPassword(password);
                if (!verified) {
            throw new Error('Incorrect Credentials!');
        }
        const accessToken = jwt.sign({
            email: user.email
        },process.env.ACCES_TOKEN_SECRET , {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            email: user.email
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            user
        });
        
    } catch (error) {
        return res.json(error.message)
    }
}