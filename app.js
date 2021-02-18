const express = require("express");
const app = express();
app.use(express.json());

const eventsRoutes = require("./routes/events");

const db = require("./db/models");

app.use("/events", eventsRoutes);

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
