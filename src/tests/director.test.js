const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/directors";

//? POST, GET-ALL, GET-ONE, PUT, DELETE

const director = {
  firstName: "Dary",
  lastName: "King",
  nationality: "Dominican",
  birthDay: "2004-02-19",
};

const updateDirector = {
  firstName: "Dariela",
  lastName: "Peguero King",
};

// POST
test("POST -> 'BASE_URL' should return status code 201 and res.body.firstName === director.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(director);
  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200, res.body[0].firstName === director.firstName and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(director.firstName);
  expect(res.body.length).toBe(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.firstName === director.firstName ", async () => {
  const res = await request(app).get(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

// PUT
test("PUT -> 'BASE_URL/:id' should return status 200 and res.body.firstName === updateDirector.firstName", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(updateDirector);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(updateDirector.firstName);
});

test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});
