import url from 'url';
import createClient from './createClient';
import express from 'express';
import extend from 'extend';

export default function createServer(nectar, store, endpoint){

  const app = express();

  // provide store so that we can use this as a location
  app._store = extend({}, store, {endpoint});

  app.use(`${endpoint}/:key`, (req, res) => {
    const key = req.params.key;
    const urlParts = url.parse(req.url, true);
    const json = urlParts.query && urlParts.query.args;
    const args = (json && JSON.parse(json)) || [];
    const localClient = createClient({servers:[app]}, app);
    localClient(key)(...args)
      .then((data) => {
        res.send(data);
      });
  });

  return app;
}
