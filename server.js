const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const database = require('./src/configs/database');
const PORT = process.env.PORT || 5000;
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

// Middleware setup
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const autRoute = require('./src/routes/authRoute')

app.use('/', autRoute);

// Server setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    // socket.on('message', (message) => {
    //     console.log(message);
    //     io.emit('message', message);
    // })

})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    database
        .authenticate()
    //   .sync({ alter: true }) // Use { force: true } during development to drop and recreate tables
      .then(() => {
        console.log("Connected to database");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  });
