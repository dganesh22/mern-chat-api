const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());

//Bring in the routes
app.use("/api/user", require("./route/userRoute"));
app.use("/api/chatroom", require("./route/chatRoomRoute"));
app.use("/api/message", require("./route/messageRoute"));

//Setup Error Handlers
const errorHandlers = require("./handler/error");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
