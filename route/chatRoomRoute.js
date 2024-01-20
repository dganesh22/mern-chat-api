const chatRoute = require('express').Router()
const { catchErrors } = require('../handler/error')
const { createChatRoom, getAllChatRooms } = require('../controller/chatRoomController')

const auth = require('../middleware/auth')

chatRoute.post(`/`, auth, catchErrors(createChatRoom))
chatRoute.get(`/`, auth, catchErrors(getAllChatRooms))

module.exports = chatRoute