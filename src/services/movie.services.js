const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const createServices = async (body) => {
  return await Movie.create(body);
};

const getAllServices = async () => {
  return await Movie.findAll({ include: [Actor, Director, Genre] });
};

const getOneServices = async (id) => {
  return await Movie.findByPk(id, { include: [Actor, Director, Genre] });
};

const updateServices = async (body, id) => {
  return await Movie.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await Movie.destroy({ where: { id } });
};

const setActorsServices = async (id, body) => {
  const movie = await getOneServices(id);
  await movie.setActors(body);
  return movie;
};

const setDirectorsServices = async (id, body) => {
  const movie = await getOneServices(id);
  await movie.setDirectors(body);
  return movie;
};

const setGenresServices = async (id, body) => {
  const movie = await getOneServices(id);
  await movie.setGenres(body);
  return movie;
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
  setDirectorsServices,
  setActorsServices,
  setGenresServices,
};
