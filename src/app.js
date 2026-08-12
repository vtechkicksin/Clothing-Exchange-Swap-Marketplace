const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const apiRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;