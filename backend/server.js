const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const url = process.env.ATLAS_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB Database connection established successfully")
);

app.use(cors());
app.use(express.json());

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

app.listen(port, () => console.log("Server is up and running on port " + port));
