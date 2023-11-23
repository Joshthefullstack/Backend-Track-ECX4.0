const request = require('supertest');
const app = require('../app');

describe('CRUD API', () => {
  let id;

  // CREATE
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/book')
      .send({
        name: 'Test Book',
        description: 'This is a test book'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Book Resource');
    id = res.body.id;
  });

  // READ
  it('should get a book by id', async () => {
    const res = await request(app).get(`/api/book/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Book Resource');
  });

  // UPDATE
  it('should update a book', async () => {
    const res = await request(app)
      .put(`/api/book/${id}`)
      .send({
        name: 'Updated Book'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Book');
  });

  // DELETE
  it('should delete a resource', async () => {
    const res = await request(app).delete(`/api/book/${id}`);
    expect(res.statusCode).toEqual(204);
  });

  // Edge case: Get a non-existent resource
  it('should return 404 when a resource is not found', async () => {
    const res = await request(app).get(`/api/book/nonexistentid`);
    expect(res.statusCode).toEqual(404);
  });

  // Error handling: Create a resource with invalid data
  it('should return 400 when creating a book with invalid data', async () => {
    const res = await request(app)
      .post('/api/book')
      .send({
        name: '', // name is required
        description: 'This is a test book'
      });

    expect(res.statusCode).toEqual(400);
  });

  // Authentication: Access a protected route
  it('should return 401 when accessing a protected route without a valid token', async () => {
    const res = await request(app).get('/api/protected');
    expect(res.statusCode).toEqual(401);
  });
});
