const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(colors.green("Database connected successfully"));
  })
  .catch((err) => {
    console.log(colors.red(err));
  });

//Routes
const Users = require("./routes/Users");
const Exercise = require("./routes/Exercises");

app.use("/exercise", Exercise);
app.use("/users", Users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(colors.yellow(`server is started at ${port}`));
});
