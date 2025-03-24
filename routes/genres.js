const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

router.get("/", genresController.getAllGenres);
router.get("/new", genresController.renderNewGenreForm); // Route to render form for new genre
router.post("/", genresController.createGenre);
router.get("/:id/edit", genresController.renderEditGenreForm); // Route to render edit form
router.put("/:id", genresController.updateGenre);
router.delete("/:id", genresController.deleteGenre);

module.exports = router;
