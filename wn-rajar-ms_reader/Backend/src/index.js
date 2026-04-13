require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const articlesRoutes = require("./routes/articles");

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, "http://localhost:5173"]
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/articles", articlesRoutes);

module.exports = app;
