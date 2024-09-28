const {
  getAll,
  create,
  getOne,
  update,
  destroy,
  setActors,
  setDirectors,
  setGenres,
} = require("../controllers/movie.controllers");
const express = require("express");

const routerMovie = express.Router();

routerMovie.route("/").get(getAll).post(create);

routerMovie.route("/:id/actors").post(setActors);
routerMovie.route("/:id/directors").post(setDirectors);
routerMovie.route("/:id/genres").post(setGenres);

routerMovie.route("/:id").get(getOne).put(update).delete(destroy);
module.exports = routerMovie;
