const Genre = require("../models/Genre");

const createServices = async (body) => {
  return await Genre.create(body);
};

const getAllServices = async () => {
  return await Genre.findAll();
};

const getOneServices = async (id) => {
  return await Genre.findByPk(id);
};

const updateServices = async (body, id) => {
  return await Genre.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await Genre.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};
