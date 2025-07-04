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
const userRouter = require("./routes/userRouter.js");
const reviewRouter =require("./routes/reviewRouter.js")

app.use("/auth", authRouter);

app.use("/movies", movieRouter);

app.use('/review', reviewRouter);
app.use('/favorite', favoriteRouter);
app.use('/user', userRouter);

app.use("/", (req, res) => {
  res.send(`Connected!`);
});

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`);
});
