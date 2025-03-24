const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.getAllMovies);
router.get("/new", moviesController.newMovieForm);
router.post("/", moviesController.createMovie);
router.get("/:id/edit", moviesController.editMovieForm);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
