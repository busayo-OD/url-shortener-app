const request = require('supertest');
const { connect } = require('./database');
const UserModel = require('../model/user.model');
const app = require('../../app');
const bcrypt = require('bcrypt');

describe('Auth', () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should signup a user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'Busayo',
        last_name: 'Dada',
        email: 'toyinoluwabusayo@gmail.com',
        password: 'bussyj001',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  

it('should login a user', async () => {
  const password = 'bussyj123';
  const hashedPassword = await bcrypt.hash(password, 8);

  await UserModel.create({
    first_name: 'test',
    last_name: 'sample',
    email: 'test@example.com',
    password: hashedPassword
  });

  // Assuming you have a route '/login' that maps to the login function
  const response = await request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@example.com',
      password: password
    });
    
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

});
