const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { AllUserRoutes } = require("./route/userRoute");

const app = express();
app.use(express.json());

app.use(AllUserRoutes);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db is connected");
    console.log(`running ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
