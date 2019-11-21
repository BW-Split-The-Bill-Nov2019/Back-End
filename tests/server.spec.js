const server = require('../api/server')
const supertest = require('supertest')

describe("testing tests", () => {
    it("should be true", () => {
      expect(true).toBe(true);
    });

    describe("GET/", () => {
        it("responds with 200 ok", () => {
          return supertest(server)
            .get("/")
            .expect(200);
        });
    })

    it("responds {api: 'is alive'}", async () => {
        await supertest(server)
          .get("/")
          .then(res => {
            expect(res.body).toEqual({ api: "running" });
          });
        }
    )
})