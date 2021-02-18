const sequelize = require("sequelize");
const { Event } = require("../db/models");
const { Op } = require("sequelize");

exports.eventFind = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    const events = await Event.findAll({
      attributes: ["id", "name", "image"],
      order: [
        ["date", "ASC"],
        ["name", "ASC"],
      ],
    });
    res.json(events);
  } else {
    const events = await Event.findAll({
      attributes: ["id", "name", "image"],
      order: [
        ["date", "ASC"],
        ["name", "ASC"],
      ],
      where: {
        date: {
          [Op.or]: {
            [Op.eq]: req.body.date,
            [Op.gt]: req.body.date,
          },
        },
      },
    });
    res.json(events);
  }
};

exports.createEvent = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const createdEvent = await Event.bulkCreate(req.body);
      res.status(201).json(createdEvent);
    } else {
      const createdEvent = await Event.create(req.body);
      res.status(201).json(createdEvent);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await res.status(204).json(foundEvent);
    } else {
      res.status(404).json({ messege: "No events by this ID" });
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleteEvent = await Event.findByPk(req.params.eventId);
    if (deleteEvent) {
      await deleteEvent.destroy();
      res.status(204).end();
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};
