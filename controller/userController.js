const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

// user register
const register = async (req,res) => {
    try {
        const { name, email, password } = req.body

        // validating email 
        if (!emailRegex.test(email)) throw "Email is not supported from your domain.";

        // validating password length
        if (password.length < 6) throw "Password must be atleast 6 characters long.";
      
        // check user already registered or not
        const userExists = await User.findOne({ email })
        if(userExists) throw `User email ${email} already exists.`

        // store the user
        const user = await User.create({
            name,
            email,
            password: bcrypt.hash(password,10)
        })

        // return res
        res.status(StatusCodes.ACCEPTED).json({ message: `User ${name} registered successfully`})

    } catch (err) {
        return err
    }
}

// user login
const login = async (req,res) => {
    try {
        const { email, password } = req.body

        // check user exists or not 
        const userExists = await User.findOne({ email })
        if(!userExists) throw `User email ${email} not registered.`

         // validate the password
         const passMatch = bcrypt.compare(password, userExists.password)
         if(!passMatch) throw `Passwords are not matched`


         // generate token if username password are valid
         const token = await jwt.sign({ id: userExists._id }, process.env.ACCESS_SECRET, { expiresIn: '1d'})

         res.status(StatusCodes.ACCEPTED).json({ message: `Login Success`, token })

    } catch (err) {
        return err
    }
}

module.exports = { register, login }