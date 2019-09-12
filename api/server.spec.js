const server = require('./server.js');

describe('server', () => {
    it('db environment set to testing', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

    describe('POST /api/auth/register', () => {
        it('should return 201 Created', () => {
            const user = { username: 'user111', password: 'password' }
            return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
                
            })
        });
    }); 

    let token = '';
    describe('POST /api/auth/login', () => {
        it('should return 200 OK', () => {
            const user = { username: 'user111', password: 'password' }
            return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(200);
                token = res.body.token;
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