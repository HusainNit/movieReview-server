require("dotenv").config();

const express = require("express");
const chalk = require("chalk");
const logger = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override");
const PORT = process.env.PORT ? process.env.PORT : 3000;
const db = require("./db");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const authRouter = require("./routes/authRouter.js");
const movieRouter = require("./routes/movieRouter.js");
const favoriteRouter = require("./routes/favoriteRouter.js");
const usersRouter = require("./routes/usersRouter.js");

app.use("/auth", authRouter);

app.use("/movies", movieRouter);

//app.use('/reviews', reviewsRouter);
app.use('/favorite', favoriteRouter);
app.use('/users', usersRouter);

app.use("/", (req, res) => {
  res.send(`Connected!`);
});

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`);
});
