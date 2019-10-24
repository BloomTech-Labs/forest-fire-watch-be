const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const scheduler = require("./scheduler/scheduler");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../models/users/users-router.js");
const locationsRouter = require("../models/locations/locations-router.js");
const notificationsRouter = require("../models/push-notifications/notifications-router.js");
const schedulerRouter = require("./scheduler/schedulerRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// scheduler;
server.use((req, res, next) => {
  // ["http://localhost:3000", "https://wildfire-watch-staging.netlify.com"].map(
  //   res.setHeader("Access-Control-Allow-Origin", domain)
  // );

  res.setHeader("Access-Control-Allow-Origin", "*");

  next();
});

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/locations", locationsRouter);
server.use("/api/push", notificationsRouter);
server.use("/api/scheduler", schedulerRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the Wildfire Watch Backend!");
});

module.exports = server;
