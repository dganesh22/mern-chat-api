
const dotenv = require('dotenv')
const connectDb = require('./db/connect')
const jwt = require('jsonwebtoken')

dotenv.config()

// models
const User = require('./model/userModel')
const ChatRoom = require('./model/chatRoomModel')
const Message = require('./model/messageModel')

const app = require('./app')
const PORT = process.env.PORT

const server = app.listen(PORT, async () => {
    await connectDb()
    console.log(`server is connected to http://localhost:${PORT}`)
})

// socket conenction
const io = require('socket.io')(server, {
    cors: {

    }
})
// socket verification id
io.use(async (socket,next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.ACCESS_SECRET)
        socket.userId = payload.id
        next()
    }catch(err) {

    }
})

// socket connection callback function
io.use('connection', socket => {
    console.log(`socket connected ${socket.userId}`)

// socket disconnect callback
socket.on('disconnet', () => {
    console.log(`disconnected: ${socket.userId}`)
})

// join room callback
socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId)
    console.log(`A user joined chatroom: ${chatroomId}`)
})

// leave chat room callback
socket.on('leaveRoom', ({ chatroomId }) => {
    socket.leave(chatroomId)
    console.log(`A user left chatroom: ${chatroomId}`)
})

// chat room message callback
socket.on('chatroomMessage', async ({ chatroomId, message }) => {
    if(message.trim().length > 0) {
        // find the user by socket.userId
        const user = await User.findOne({ _id: socket.userId })
        // create a new message
         await Message.create({
            chatroom: chatroomId,
            user: socket.userId,
            name: user.name,
            message
        })

        // send messages
        io.to(chatroomId).emit("newMessage", {
            message,
            name: user.name,
            user: socket.userId 
        })

    }
    console.log(`A user joined chatroom: ${chatroomId}`)
})
})
