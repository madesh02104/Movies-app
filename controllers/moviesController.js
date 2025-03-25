const pool = require("../db/pool");

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT movies.*, genres.name AS genre_name 
      FROM movies 
      JOIN genres ON movies.genre_id = genres.id
      ORDER BY movies.id
    `);
    res.render("movies/index", { movies: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const newMovieForm = async (req, res) => {
  try {
    const genres = await pool.query("SELECT * FROM genres");
    res.render("movies/new", { genres: genres.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const createMovie = async (req, res) => {
  const { name, genre_id } = req.body;
  try {
    await pool.query("INSERT INTO movies (title, genre_id) VALUES ($1, $2)", [
      name,
      genre_id,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const editMovieForm = async (req, res) => {
  const { id } = req.params;
  try {
    const movieResult = await pool.query("SELECT * FROM movies WHERE id = $1", [
      id,
    ]);
    const genresResult = await pool.query("SELECT * FROM genres");

    if (movieResult.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }

    res.render("movies/edit", {
      movie: movieResult.rows[0],
      genres: genresResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE movies SET title = $1, genre_id = $2 WHERE id = $3 RETURNING *",
      [title, genre_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllMovies,
  newMovieForm,
  createMovie,
  editMovieForm,
  updateMovie,
  deleteMovie,
};
