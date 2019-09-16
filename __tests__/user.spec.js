
const request = require('supertest')
const server = require('../api/server.js')
// const knex = require('knex')
// const knexConfig = require('../knexfile.js')
// const environment = process.env.NODE_ENV || 'development'
const db = require('../database/dbConfig.js') 
const User = require('../models/users/users-model.js')
  // console.log("env", environment)
  

  beforeEach(async () => {
    await db('users').truncate()
  })

describe("server", () => {
  describe('/ route', () => {
    it("Should return status code 200", async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200)
    })
  })
})


describe('/api/auth/register', () => {
  it("should return code 201 after creation of user", async () => {
    let response = await request(server)
      .post("/api/auth/register")
      .send({username: "username", password: "password"})

    expect(response.status).toBe(201)

  })

  it("should return a  409 code when the username already exists", async () => {
    request(server)
      .post("/api/auth/register")
      .send({username: "username123", password: "password"})
    let response = await request(server)
      .post("/api/auth/register")
      .send({username: "username", password: "password"})
    expect(response.status).toBe(409)

  })
  it("should return a message that says A user with than name already exists", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({username: "username123", password: "password"})
    let response = await request(server)
      .post("/api/auth/register")
      .send({username: "username123", password: "password"})
    // console.log(response)
    expect(response.text).toBe("{\"username\":\"A user with that name already exists\"}")
  })

  it("should should return a messagde when user successfully logs in", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({username: "username123", password: "password"})
    let response = await request(server)
      .post("/api/auth/login")
      .send({username: "username123", password: "password"})
    // console.log(response)
    expect(response["text"]).toBe("Welcome username123")
  })

})

