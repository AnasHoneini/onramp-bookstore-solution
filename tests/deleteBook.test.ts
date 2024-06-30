import request from 'supertest';
import { app, server } from '../server';

afterAll((done) => {
  server.close(done);
});

describe('DELETE /api/books/:id', () => {
  it('should delete a book that exists', async () => {
    const res = await request(app).delete('/api/books/1').send();

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

  it('should return 404 if the book does not exist', async () => {
    const res = await request(app).delete('/api/books/999').send();

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Book not found');
  });
});
