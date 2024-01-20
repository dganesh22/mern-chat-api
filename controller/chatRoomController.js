const { StatusCodes } = require('http-status-codes')
const ChatRoom = require('../model/chatRoomModel')

// create a chat room
const createChatRoom = async (req,res) => {
    try {
        const { name } = req.body

        const nameReg = /^[A-Za-z\s]+$/

        if(!nameReg.test(name)) throw "Chatroom name can contain only alphabets"

        const chatRoomExists = await ChatRoom.findOne({ name })
            if(chatRoomExists) throw "Chatroom with that name already exists!"

        const chatroom = ChatRoom.create({name})

        res.status(StatusCodes.ACCEPTED).json({ message: "chatroom created", chatroom })
                
    } catch (err) {
        return err
    }
}

// get all chat rooms
const getAllChatRooms = async (req,res) => {
    try {
        const chatrooms = await ChatRoom.find({})   
        res.status(StatusCodes.OK).json(chatrooms)
    } catch (err) {
        return err
    }
}

module.exports = { createChatRoom, getAllChatRooms }