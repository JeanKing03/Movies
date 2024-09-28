const {
  create,
  getAll,
  getOne,
  update,
  destroy,
} = require("../controllers/director.controllers");
const express = require("express");

const routerDirector = express.Router();

routerDirector.route("/").post(create).get(getAll);

routerDirector.route("/:id").get(getOne).put(update).delete(destroy);

module.exports = routerDirector;
