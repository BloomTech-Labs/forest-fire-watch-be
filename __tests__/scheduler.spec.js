
const request = require('supertest')
const server = require('../api/server.js')
const {haversineDistance } = require('../api/scheduler/scheduler_functions.js')
// const db = require('../database/dbConfig.js') 
// const Location = require('../models/locations/locations-model.js')
//
//

describe("Haversine Function", () => {
  it("Should return the correct distance in miles", () => {
    const result = haversineDistance([40.689202777778, -74.044219444444], [38.889069444444, -77.034502777778], true)
    expect(result.toFixed(2)).toEqual("201.66")
  })

  it("Should return the correct distance in kilometers", () => {
    const result = haversineDistance([40.689202777778, -74.044219444444], [38.889069444444, -77.034502777778])
    expect(result.toFixed(2)).toEqual("324.53")
  })

  it("Should return a string", () => {
    const result = haversineDistance([40.689202777778, -74.044219444444], [38.889069444444, -77.034502777778])
    expect(result.toFixed(2)).toEqual("324.53")
  })
})
