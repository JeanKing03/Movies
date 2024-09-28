const {
  create,
  getAll,
  getOne,
  update,
  destroy,
} = require("../controllers/genre.controllers");
const express = require("express");

const routerGenre = express.Router();

routerGenre.route("/").post(create).get(getAll);

routerGenre.route("/:id").get(getOne).put(update).delete(destroy);

module.exports = routerGenre;
