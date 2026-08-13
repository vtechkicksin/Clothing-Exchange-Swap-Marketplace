const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const apiRoutes = require("./routes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
