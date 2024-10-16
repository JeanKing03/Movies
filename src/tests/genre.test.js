const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/genres";

//? POST, GET-ALL, GET-ONE, PUT, DELETE

const genre = {
  genreName: "Accion",
};

const updateGenres = {
  genreName: "Sci-Fi",
};

let genreId;

// POST
test("POST -> 'BASE_URL' should return status code 201 and res.body.genreName === genre.genreName", async () => {
  const res = await request(app).post(BASE_URL).send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.genreName).toBe(genre.genreName);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200, res.body[0].genreName === genre.genreName and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].genreName).toBe(genre.genreName);
  expect(res.body.length).toBe(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.genreName === genre.genreName ", async () => {
  const res = await request(app).get(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.genreName).toBe(genre.genreName);
});

// PUT
test("PUT -> 'BASE_URL/:id' should return status 200 and res.body.genreName === updateGenre.genreName", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(updateGenres);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].genreName).toBe(updateGenres.genreName);
});

test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(204);
});
