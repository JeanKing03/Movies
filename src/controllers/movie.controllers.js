const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const create = catchError(async (req, res) => {
  const results = await Movie.create(req.body);
  return res.status(201).json(results);
});

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({ include: [Actor, Director, Genre] });
  return res.status(200).json(results);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Movie.findByPk(id, { include: [Actor] });
  if (!results)
    return res.status(404).json({ message: "The Movie Does Not Exist!" });
  return res.status(200).json(results);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (results[0] === 0)
    return res.status(404).json({ message: "Movie Not Found!" });
  return res.status(200).json(results[1]);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Movie.destroy({ where: { id } });
  return res.json(results);
});

const setActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
  await movies.setActors(req.body);
  const actors = await movies.getActors();
  return res.json(actors);
});

const setDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
  await movies.setDirectors(req.body);
  const directors = await movies.getDirectors();
  return res.status(200).json(directors);
});

const setGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
  await movies.setGenres(req.body);
  const genres = await movies.getGenres();
  return res.json(genres);
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
  setActors,
  setDirectors,
  setGenres,
};
