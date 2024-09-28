const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");

const create = catchError(async (req, res) => {
  const results = await Genre.create(req.body);
  return res.status(201).json(results);
});

const getAll = catchError(async (req, res) => {
  const results = await Genre.findAll();
  return res.status(200).json(results);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Genre.findByPk(id);
  return res.status(200).json(results);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Genre.update(req.body, {
    where: { id },
    returning: true,
  });
  if (results[0] === 0)
    return res.status(404).json({ message: "Movie Not Found!" });
  return res.status(200).json(results);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  await Genre.destroy({ where: { id } });
  return res.json();
});

module.exports = { create, getAll, getOne, update, destroy };
