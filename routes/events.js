const express = require("express");
const Router = express.Router();

const { Events } = require("../db/models");
const {
  eventFind,
  createEvent,
  getEventById,
  deleteById,
} = require("../controllers/eventControllers");

Router.get("/", eventFind);

Router.post("/", createEvent);

Router.get("/:eventId", getEventById);

Router.delete("/:eventId", deleteById);

module.exports = Router;
