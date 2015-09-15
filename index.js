import 'core-js';
import fetch from 'isomorphic-fetch';
import url from 'url';

const HTTP = 'HTTP';
const SERVER = 'SERVER';

// provide httpBackend for testing
function createNector(endpoint, httpBackend){
  function createTransport(loc){

    const type = (typeof loc === 'string') ? HTTP : SERVER;
    switch(type){
    case HTTP:
      return createHttpTransport(loc, endpoint);
    case SERVER:
      return createServerTransport(loc._store);
    }
  }

  function runTransport(key, args, transport){
    if(transport.apply){
      return transport(key, ...args);
    }else{
      return transport[key](...args);
    }
  }

  function createHttpTransport(loc){
    return function httpTransport(key, ...args){
      const json = JSON.stringify(args);
      const encoded = encodeURIComponent(json);
      httpBackend = httpBackend || fetch;
      return httpBackend(`${loc}${endpoint}/${key}?args=${encoded}`)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  function createServerTransport(store){
    return store;
  }

  function createClient(loc){
    return function client(key){
      const transport = createTransport(loc, endpoint);
      return function runRequest(...args){
        return runTransport(key, args, transport, endpoint);
      };
    };
  }

  function createServer(store, connect){

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
  return {endpoint, createServer, createClient};
}

export default {createNector};
