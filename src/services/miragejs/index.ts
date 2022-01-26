import {
  ActiveModelSerializer,
  createServer,
  hasMany,
  Model,
  Factory,
  belongsTo,
} from 'miragejs';

type List = {
  id: number;
  name: string;
  user: any;
};

type User = {
  id: number;
  name: string;
  username: string;
  lists: any;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({
        lists: hasMany('list'),
      }),
      list: Model.extend<Partial<List>>({
        user: belongsTo('user'),
      }),
    },

    factories: {
      user: Factory.extend({
        id: '1',
        name: 'Matheus Pedroni',
        username: 'mpedroni',
      }),
    },

    seeds(server) {
      server.create('user');
    },

    routes() {
      this.namespace = 'api';

      this.get('/users/:id/lists', (schema, request) => {
        const { id } = request.params;

        const user = schema.find('user', id);

        const lists = user?.lists.models;

        return {
          lists,
        };
      });

      this.post('/lists');

      // this.get('/lists/presets', () => ({
      //   presets: [
      //     { id: 1, name: 'Filmes' },
      //     { id: 2, name: 'Livros' },
      //   ],
      // }));
    },
  });

  return server;
}
