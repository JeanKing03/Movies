const express = require("express");
const routerMovie = require("./movie.router");
const routerActor = require("./actor.router");
const routerGenre = require("./genre.router");
const routerDirector = require("./director.router");
const router = express.Router();

// colocar las rutas aquí
router.use("/movies", routerMovie);
router.use("/actors", routerActor);
router.use("/directors", routerDirector);
router.use("/genres", routerGenre);

module.exports = router;
