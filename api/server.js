const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const scheduler = require("./scheduler/scheduler");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../models/users/users-router.js");
const locationsRouter = require("../models/locations/locations-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// scheduler;

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/locations", locationsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the FireFlight Backend!");
});

module.exports = server;
