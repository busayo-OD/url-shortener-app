const request = require('supertest');
const { connect } = require('./database');
const UserModel = require('../model/user.model');
const UrlModel = require('../model/url.model');
const app = require('../../app');
const bcrypt = require('bcrypt');

describe('Url Route', () => {
    let conn;
    let token;
    let user;

    beforeAll(async () => {
        conn = await connect()

        const password = 'bussyj123';
        const hashedPassword = await bcrypt.hash(password, 8);

        user = await UserModel.create({
            first_name: 'test',
            last_name: 'sample',
            email: 'test@example.com',
            password: hashedPassword
        });

        
        const loginResponse = await request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'test@example.com',
            password: password
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return the user urls', async () => {
        
        // create url in our db
        await UrlModel.create({
            longUrl: "https://search.yahoo.com/search?fr=mcafee&type=E211US1316G91229&p=American+Airlines",
        })

        await UrlModel.create({
            longUrl: "https://search.yahoo.com/search?fr=mcafee&type=E211US1316G91229&p=Amazon",
        })

        const response = await request(app)
        .get('/urls')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })

    it('should return the short URL with the specified ID', async () => {
        const url = await UrlModel.create({
            longUrl: 'https://search.yahoo.com/search?fr=mcafee&type=E211US1316G91229&p=Shopify',
            title: 'Shopify',
            backHalf: 'shopify'
          });
      
        const response = await request(app)
          .get(`/urls/${url._id}`)
          .set('content-type', 'application/json');
    
        expect(response.status).toBe(200);
        expect(response.body.longUrl).toBe('https://search.yahoo.com/search?fr=mcafee&type=E211US1316G91229&p=Shopify');
        expect(response.body.title).toBe('Shopify');
        expect(response.body.backHalf).toBe('shopify');
      });

      // it('should create a short URL and return the created URL object', async () => {
        
      //   const response = await request(app)
      //     .post('/urls/shorten')
      //     .set('content-type', 'application/json')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send({
      //       longUrl: 'https://example.com',
      //       backHalf: 'abc123',
      //       title: 'Example Website',
      //       tags: ['example', 'url']
      //     });
    
      //   expect(response.status).toBe(201);
        // expect(response.body).toHaveProperty('_id');
        // expect(response.body.longUrl).toBe(longUrl);
        // expect(response.body.backHalf).toBe(backHalf);
        // expect(response.body.title).toBe(title);
        // expect(response.body.tags).toEqual(expect.arrayContaining(tags));
        // expect(response.body.owner).toBeDefined();
        // expect(response.body.date).toBeDefined();
      // });
});
