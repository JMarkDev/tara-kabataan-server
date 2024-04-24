const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const database = require("./src/configs/database");
const PORT = process.env.PORT || 5000;
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const verifiedUser = require("./src/middlewares/verifyUser");
const autRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const eventRoute = require("./src/routes/eventRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const archiveRoute = require("./src/routes/archiveRoute");
const chatbotRoute = require("./src/routes/chatbotRoute");
const attendeesRoute = require("./src/routes/attendeesRoute");
const commentRoute = require("./src/routes/commentsRoute");
const analyticsRoute = require("./src/routes/analitycsRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const notificationRoute = require("./src/routes/notificationRoute");

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/uploads/${filename}`);
});

app.get("/", verifiedUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.use("/auth", autRoute);
app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/category", categoryRoute);
app.use("/archive", archiveRoute);
app.use("/chatbot", chatbotRoute);
app.use("/attendees", attendeesRoute);
app.use("/comment", commentRoute);
app.use("/analytics", analyticsRoute);
app.use("/payment", paymentRoute);
app.use("/notifications", notificationRoute);

// Server setup
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  database.authenticate();
  database
    .sync({ force: false }) // Use { force: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
