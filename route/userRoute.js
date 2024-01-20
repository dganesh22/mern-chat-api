const userRoute = require('express').Router()
const { catchErrors } = require('../handler/error')
const { register, login } = require('../controller/userController')

userRoute.post(`/register`, catchErrors(register))
userRoute.post(`/login`, catchErrors(login))

module.exports = userRoute