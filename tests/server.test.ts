import request from 'supertest';
import { app, server } from '../server';

afterAll((done) => {
  server.close(done);
});

describe('GET /api/books', () => {
  it('should return a list of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    response.body.forEach(
      (book: { id: number; title: string; author: string }) => {
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('title');
        expect(book).toHaveProperty('author');
      },
    );
  });
});
