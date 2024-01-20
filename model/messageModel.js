const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true,"Chatroom is required!"],
    ref: "Chatroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true,"Chatroom is required!"],
    ref: "User",
  },
  name: {
    type: String,
  },
  message: {
    type: String,
    required: [true, "Message is required!"],
  },
});

module.exports = mongoose.model("Message", messageSchema);
