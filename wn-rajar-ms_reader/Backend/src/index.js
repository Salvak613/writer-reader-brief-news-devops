require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const articlesRoutes = require("./routes/articles");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/articles", articlesRoutes);

module.exports = app;
