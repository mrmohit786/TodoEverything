const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const url = config.get("URL");
const User = require("./Routes/User");
const Task = require("./Routes/Task");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error" + error));

const app = express();

const PORT = 5000;
app.use(express.json({ extended: true }));

app.use("/", User);
app.use("/", Task);

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
