const express = require("express"); // 1.importing express
const { chats } = require("./data/data"); //4.importing chats data from data.js
const dotenv = require("dotenv"); //9.importing dotenv after we installed it using npm i env
const connectDB = require("./config/db");
const colors = require("colors"); //this is to make the colors in terminal look good
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware"); //error handling

dotenv.config(); //10.config

connectDB();
const app = express(); //2.instance of the express variable

app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// app.get("/api/chat", (req, res) => {
//   res.send(chats); // 5.exported from data.js
// });

// app.get("/api/chat/:id", (req, res) => {
//   //console.log(req.params.id); //6.we use params because the id is present in the params which is present in the object so we send the req of the id which is present in params
//   const singleChat = chats.find((c) => c._id === req.params.id); // 7.we are isolating the id as a single chat and then we compare each chats with the required id and if it matches then we send it
//   res.send(singleChat); //8.here we send it
// });

const PORT = process.env.PORT || 5000; //11.brings the port value present in .env file or if its not available then 5000 is set

const server = app.listen(
  PORT,
  console.log(`Server started on PORT ${PORT}`.yellow.bold)
); //3., 12. we updated the port
//3.instead of always entering node backend/server.js go to package.json and in scripts add "start": "nodemon backend/server.js" and in terminal now if you press (npm start) it will start the server

app.set("view engine", "html");
app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/pomo", function (req, res) {
  res.sendFile(__dirname + "/pomo.html");
});

app.get("/todo", function (req, res) {
  res.sendFile(__dirname + "/todo.html");
});

app.use(notFound);
app.use(errorHandler);

const io = require("socket.io")(server, {
  pingTimeout: 60000, //if theres no response for 60 seconds then it is off to save bandwidth
  cors: {
    //to avoid cross origin errors
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //switching the socket on
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
