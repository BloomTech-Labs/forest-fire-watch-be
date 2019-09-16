
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig.js') 
const Location = require('../models/locations/locations-model.js')


beforeEach(async () => {
  await db('locations').truncate()
})


describe("Locations", () => {
  it("will return a 200 code when hitting /", async () => {
    const response = await request(server).get("/")
    expect(response.status).toEqual(200)
  })

  it("will return a 500 error if the user does not exist", async () => {
    const response = await request(server).get("/9999999")
    expect(response).toEqual(500)
  })


})
