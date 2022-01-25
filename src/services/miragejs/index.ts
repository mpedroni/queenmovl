import { createServer, Response } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/users/:id/lists', () => ({
        lists: [],
      }));

      this.get('/lists/presets', () => ({
        presets: [
          { id: 1, name: 'Filmes' },
          { id: 2, name: 'Livros' },
        ],
      }));
    },
  });
}
