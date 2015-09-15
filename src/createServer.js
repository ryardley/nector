import url from 'url';
import createClient from './createClient';
export default function createServer(store, connect, endpoint){

  const app = connect;

  // provide store so that we can use this as a location
  app._store = Object.assign({}, store, {endpoint});

  app.use(`${endpoint}/:key`, (req, res) => {
    const key = req.params.key;
    const urlParts = url.parse(req.url, true);
    const json = urlParts.query && urlParts.query.args;
    const args = (json && JSON.parse(json)) || [];
    const localClient = createClient(app);
    localClient(key)(...args)
      .then((data) => {
        res.send(data);
      });
  });

  return app;
}
