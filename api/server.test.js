// Write your tests here
/* test('sanity', () => {
  expect(true).toBe(false)
}) */
const request = require("supertest")
const server = require("../api/server")
const db= require("../data/dbConfig")
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('POST /register user', ()=>{
  it("checks the status code", async () => {
    await db('users').truncate()
      const res = await request(server).post("/api/auth/register").send({username: 'Tim', password: '963'})
      expect(res.status).toBe(201)
      expect(res.type).toBe("application/json")
  }) 
  it("checks the data sent", async () => {
    await db('users').truncate()
      const res = await request(server).post("/api/auth/register").send({username: 'Tim', password: '963'})
      expect(res.body.id).toBe(1)
      expect(res.body.username).toBe('Tim')
  })  
})
describe('POST /login users', ()=>{
  test("logs in user", async () => {
      const res = await request(server).post("/api/auth/login").send({username: 'mark', password: 'pw'})
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe("application/json")
      expect(res.body.message).toBe('Welcome, mark!')
  })  

  test("rejects user with invalid credentials and gives correct error code", async () => {
    const res = await request(server).post("/api/auth/login").send({username: 'John', password: '$2a$14$F8VPm/IOSys2zUYP5ja0lObZol/ubBgnJ8YDUhexxskdyfe4CBtQm'})
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('invalid credentials')
}) 
})