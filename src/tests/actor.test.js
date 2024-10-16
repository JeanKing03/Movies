const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/actors";

//? POST, GET-ALL, GET-ONE, PUT, DELETE

const actor = {
  firstName: "Jean",
  lastName: "King",
  nationality: "Dominican",
  birthDay: "1999-03-30",
};

const updateActor = {
  firstName: "Jean Carlos",
  lastName: "King Green",
};

let actorId;

// POST
test("POST -> 'BASE_URL' should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(actor);
  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200, res.body[0].firstName === actor.firstName and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(actor.firstName);
  expect(res.body.length).toBe(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.firstName === actor.firstName ", async () => {
  const res = await request(app).get(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

// PUT
test("PUT -> 'BASE_URL/:id' should return status 200 and res.body.firstName === updateActor.firstName", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(updateActor);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(updateActor.firstName);
});

test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});
