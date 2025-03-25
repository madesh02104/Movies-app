const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { genre_id } = req.query;
  try {
    const genresResult = await pool.query("SELECT * FROM genres");

    let moviesQuery = `
        SELECT movies.id, movies.title, movies.genre_id, genres.name AS genre_name
        FROM movies
        LEFT JOIN genres ON movies.genre_id = genres.id
      `;
    const queryParams = [];

    if (genre_id) {
      moviesQuery += " WHERE genre_id = $1";
      queryParams.push(genre_id);
    }

    const moviesResult = await pool.query(moviesQuery, queryParams);

    res.render("home", {
      genres: genresResult.rows,
      movies: moviesResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
