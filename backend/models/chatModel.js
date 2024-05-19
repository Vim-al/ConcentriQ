const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, //this is gonna reference to the ID of the user that is present
        ref: "User",
      },
    ], //square brackets are used because it is represented as an array in chat there are two users and in a groupchat more than 2
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, //whenever a new data is added it registers the time like a new chat is entered then that time is stored
  }
);

const Chat = mongoose.model("Chat", chatModel); //we create a model name chat and provid the object that we created above i.e the chatModel

module.exports = Chat; //here the chat is exported
