const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const url = config.get("URL");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error" + error));

const app = express();

const PORT = 5000 | process.env.PORT;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HELLO FRIEND");
});

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
