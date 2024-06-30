import request from 'supertest';
import { app, server } from '../server';
import http from 'http';

afterAll((done) => {
  server.close(done);
});

describe('Book API Endpoints', () => {
  it('GET /api/books - should return a list of books', async () => {
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

  it('DELETE /api/books/:id - should delete a book that exists', async () => {
    const res = await request(app).delete('/api/books/1').send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

  it('DELETE /api/books/:id - should return 404 if the book does not exist', async () => {
    const res = await request(app).delete('/api/books/999').send();
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Book not found');
  });
});
