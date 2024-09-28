const catchError = require("../utils/catchError");
const Director = require("../models/Director");

const create = catchError(async (req, res) => {
  const results = await Director.create(req.body);
  return res.status(201).json(results);
});

const getAll = catchError(async (req, res) => {
  const results = await Director.findAll();
  return res.status(200).json(results);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Director.findByPk(id);
  return res.status(200).json(results);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Director.update(req.body, {
    where: { id },
    returning: true,
  });
  return res.status(200).json(results[1]);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  await Director.destroy({ where: { id } });
  return res.sendStatus(204).json({ message: "Diretor Deleted!" });
});

module.exports = { create, getAll, getOne, update, destroy };
