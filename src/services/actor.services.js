const Actor = require("../models/Actor");

const createServices = async (body) => {
  return await Actor.create(body);
};

const getAllServices = async () => {
  return await Actor.findAll();
};

const getOneServices = async (id) => {
  return await Actor.findByPk(id);
};

const updateServices = async (body, id) => {
  return await Actor.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await Actor.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};
