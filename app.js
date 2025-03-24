const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const genresRouter = require("./routes/genres");
const moviesRouter = require("./routes/movies");
const methodOverride = require("method-override");

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/genres", genresRouter);
app.use("/movies", moviesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Movie app running on ${PORT}!`);
});
