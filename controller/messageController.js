const Message = require('../model/messageModel')
const {StatusCodes } = require('http-status-codes')

// read all messages
const getAllMsgs = async (req,res) => {
    const { chatroom } = req.params
    const messages = await Message.find({ chatroom })
    res.status(StatusCodes.OK).json(messages)
}

module.exports = { getAllMsgs }