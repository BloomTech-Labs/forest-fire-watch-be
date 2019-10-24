const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js') 

// beforeEach(async () => {
//     await db('users').truncate()
// })

describe('server', () => {
    it('db environment set to testing', async () => {
        expect(process.env.DB_ENV).toBe('testing');
        await db('users').truncate();
    });

    describe("server", () => {
        describe('/ route', () => {
            it("Should return status code 200", async () => {
                let response = await request(server).get('/');
                expect(response.status).toBe(200)
            })
        })
    });

    describe('POST /api/auth/register', () => {
        it('should return 201 Created', () => {
            const user = { email: 'user111@gmail.com', first_name: "test", last_name: "test", UID: "abcd123" }
            return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
            })
        });
    }); 

    describe('POST /api/auth/register', () => {
        it('should return 409 if posting duplicate user', () => {
            const user = { email: 'user111@gmail.com', first_name: "test", last_name: "test", UID: "abcd123" }
            return request(server)
                .post('/api/auth/register')
                .send(user)
                .then(res => {
                    expect(res.status).toBe(409);
                    expect(JSON.parse(res.text)["email"]).toBe("A user with that email already exists");
                })
        });
    }); 

    let token = '';
    describe('POST /api/auth/login', () => {
        it('should return 200 OK', () => {
            const user = { UID: 'abcd123' }
            return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(200);
                token = res.body.token;
                // console.log(res.text);
                expect(JSON.parse(res.text)["message"]).toBe("Welcome test!")
            })
        });
    }); 

    describe('POST /api/auth/login', () => {
        it('should return 404 for a user that does not exist', () => {
            const user = { UID: 'randomuid' }
            return request(server)
                .post('/api/auth/login')
                .send(user)
                .then(res => {
                    expect(res.status).toBe(404);
                    console.log(res.text);
                    expect(JSON.parse(res.text)["message"]).toBe("User does not exist")
                })
        });
    }); 

    describe('GET /api/users/session', () => {
        it('should return 200 OK', () => {
            return request(server)
            .get('/api/users/session')
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    });
  }); 
