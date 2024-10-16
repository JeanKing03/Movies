//* -----------------------------
require("../models");
//* ------------------------------
const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/movies";

//? POST, GET-ALL, GET-ONE, PUT, DELETE, SET-ACTORS, SET-DIRECTORS, SET-GENRES

// Before All Tests
beforeAll(async () => {
  const actor = {
    firstName: "Jean",
    lastName: "King",
    nationality: "Dominican",
    birthDay: "1999-03-30",
  };

  const director = {
    firstName: "Dary",
    lastName: "King",
    nationality: "Dominican",
    birthDay: "2004-02-19",
  };

  const genre = {
    genreName: "Accion",
  };

  const resActor = await request(app).post("/api/v1/actors").send(actor);
  actorId = resActor.body.id;

  const resDirector = await request(app)
    .post("/api/v1/directors")
    .send(director);
  directorId = resDirector.body.id;

  const resGenre = await request(app).post("/api/v1/genres").send(genre);
  genreId = resGenre.body.id;
});

// After All Tests
afterAll(async () => {
  await request(app).delete(`/api/v1/actors/${actorId}`);
  await request(app).delete(`/api/v1/directors/${directorId}`);
  await request(app).delete(`/api/v1/genres/${genreId}`);
});

let movieId;
let actorId;
let directorId;
let genreId;

const movie = {
  movieName: "Fast And Furio 15",
  Image: "www.asd.com",
  synopsis: "Good Movie",
  releaseYear: "2020",
};

const movieUpdate = {
  movieName: "Fast And Furio 15",
};

// POST
test("POST -> 'BASE_URL' should return status code 201 and res.body.movieName to be movie.movieName", async () => {
  const res = await request(app).post(BASE_URL).send(movie);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.movieName).toBe(movie.movieName);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200 and res.body to havent length === 0", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body.length).toBe(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.movieName === movieName", async () => {
  const res = await request(app).get(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.actors).toBeDefined();
  expect(res.body.directors).toBeDefined();
  expect(res.body.genres).toBeDefined();
  expect(res.body.movieName).toBe(movie.movieName);
  expect(res.body.id).toBe(movieId);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' should return status code 200 and res.body.movieName to be movieUpdate.movieName", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.movieName).toBe(movieUpdate.movieName);
  expect(res.body.id).toBe(movieId);
});

// SET-ACTORS
test("POST -> 'BASE_URL/:id/actors' should return status code 200,  res.body to be defined and res.body[0].movieActors.actorId === actorId", async () => {
  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actorId]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].movieActors.actorId).toBe(actorId);
});

// SET-DIRECTORS
test("POST -> 'BASE_URL/:id/directors' should return status code 200, res.body to be defined and res.body[0].movieDirectors.directorId === directorId ", async () => {
  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([directorId]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].movieDirectors.directorId).toBe(directorId);
});

// SET-GENRES
test("POST -> 'BASE_URL/:id/genres' should return status code 200,  res.body to be defined and res.body[0].movieGenres.genreId === genreId", async () => {
  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genreId]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].movieGenres.genreId).toBe(genreId);
});

// DELETE
test("DETELE -> 'BASE_URL/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
