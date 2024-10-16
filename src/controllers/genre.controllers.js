const catchError = require("../utils/catchError");
const {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
} = require("../services/genre.services");

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
  return res.status(200).json(results);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await updateServices(req.body, id);
  if (results[0] === 0)
    return res.status(404).json({ message: "Movie Not Found!" });
  return res.json(results[1]);
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  await removeServices(id);
  return res.sendStatus(204);
});

module.exports = { create, getAll, getOne, update, destroy };
