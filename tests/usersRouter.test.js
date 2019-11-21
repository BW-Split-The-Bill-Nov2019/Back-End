const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig.js");
const Users = require("../data/models/friendsModel.js");

describe("usersRoutes", () => {
  describe("/GET", () => {
    it("should return 200 ok", async () => {
      const res = await request(server).get("/api/auth");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    it("respond with 404 when nothing is sent through", () => {
      return request(server)
        .post("/api/auth/register/user")
        .expect(404);
    })
    })
})
