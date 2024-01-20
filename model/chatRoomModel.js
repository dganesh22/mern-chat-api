const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
