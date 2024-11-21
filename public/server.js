const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const { sequelize } = require("../models");
const userRouter = require('../routers/user.routers');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', userRouter);

const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
