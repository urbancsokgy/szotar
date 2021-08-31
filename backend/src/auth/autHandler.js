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
        },process.env.ACCESS_TOKEN_SECRET , {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            email: user.email
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
                
        res.json({
            accessToken,
            refreshToken,
            _id : user._id,
            firstName : user.firstName,
            lastName  : user.lastName,
            email : user.email
        });
        
    } catch (error) {
        return res.json(error.message)
    }
}
module.exports.refresh = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            ...user
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({
            accessToken
        });
    });
};

module.exports.logout = (req, res) => {
    const { token } = req.body;
    
    if (!refreshTokens.includes(token)) {
        console.log("error", !refreshTokens.includes(token));
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        console.log(user);
    })
   
    const tokenIndex = refreshTokens.indexOf(token);
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
};
