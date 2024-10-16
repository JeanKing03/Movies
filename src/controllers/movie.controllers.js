const {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
  setDirectorsServices,
  setActorsServices,
  setGenresServices,
} = require("../services/movie.services");
const catchError = require("../utils/catchError");

const create = catchError(async (req, res) => {
  const results = await createServices(req.body);
  return res.status(201).json(results);
});

const getAll = catchError(async (req, res) => {
  const results = await getAllServices();
  return res.status(200).json(results);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await getOneServices(id);
  if (!results)
    return res.status(404).json({ message: "The Movie Does Not Exist!" });
  return res.status(200).json(results);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await updateServices(req.body, id);
  if (results[0] === 0)
    return res.status(404).json({ message: "Movie Not Found!" });
  return res.status(200).json(results[1][0]);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  await removeServices(id);
  return res.sendStatus(204);
});

const setActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await setActorsServices(id, req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

const setDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await setDirectorsServices(id, req.body);
  const directors = await movie.getDirectors();
  return res.json(directors);
});

const setGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await setGenresServices(id, req.body);
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
