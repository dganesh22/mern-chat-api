const msgRoute = require('express').Router()
const { catchErrors } = require('../handler/error')
const { getAllMsgs }  = require('../controller/messageController')
const auth = require('../middleware/auth')

msgRoute.get(`/:chatroom`, auth, catchErrors(getAllMsgs))

module.exports = msgRoute