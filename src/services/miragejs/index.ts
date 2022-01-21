import { createServer, Model } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/users/:id/lists', () => ({
        lists: [
          { id: 1, title: 'Filmes' },
          { id: 2, title: 'Livros' },
          { id: 3, title: 'Filmes de terror' },
          { id: 4, title: 'Filmes do oscar' },
          { id: 5, title: 'Livros técnicos' },
        ],
      }));
    },
  });
}
