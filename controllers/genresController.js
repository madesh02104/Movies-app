const pool = require("../db/pool");

const getAllGenres = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM genres");
    res.render("genres/index", { genres: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const renderNewGenreForm = (req, res) => {
  res.render("genres/new");
};

const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const renderEditGenreForm = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Genre not found");
    }
    res.render("genres/edit", { genre: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const result = await pool.query(
      "UPDATE genres SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Genre not found");
    }
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM genres WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Genre not found");
    }
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllGenres,
  renderNewGenreForm,
  createGenre,
  renderEditGenreForm,
  updateGenre,
  deleteGenre,
};
