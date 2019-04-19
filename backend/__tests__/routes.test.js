const request = require('supertest');
const server = require('../server');

beforeAll(async () => {
  console.log('Jest starting...');
});

afterAll(() => {
  server.close();
  console.log('Jest closing...');
});

describe('basic route tests', () => {
  test(`get home route GET '/'`, async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Hello World');
  });
});

describe('issues route tests', () => {
  test(`get all issues GET '/api/v1/issues'`, async () => {
    const response = await request(server).get('/api/v1/issues');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Open');
  });
});
