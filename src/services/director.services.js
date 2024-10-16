const Director = require("../models/Director");

const createServices = async (body) => {
  return await Director.create(body);
};

const getAllServices = async () => {
  return await Director.findAll();
};

const getOneServices = async (id) => {
  return await Director.findByPk(id);
};

const updateServices = async (body, id) => {
  return await Director.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await Director.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};
