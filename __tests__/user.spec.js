
const request = require('supertest')
const server = require('../api/server.js')
const knex = require('knex')


describe("server", () => {
  describe('/ route', () => {
    it("Should return status code 200", async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200)
    })
  })
})

