import { createServer, Model } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/users/:id/lists', () => ({
        lists: [
          { id: 1, name: 'Filmes' },
          { id: 2, name: 'Livros' },
          { id: 3, name: 'Filmes de terror' },
          { id: 4, name: 'Filmes do oscar' },
          { id: 5, name: 'Livros técnicos' },
        ],
      }));

      this.get('/me', () => ({
        name: 'Matheus Pedroni',
        username: 'mpedroni',
        avatar_url: 'https://github.com/mpedroni.png',
      }));
    },
  });
}
