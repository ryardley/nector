'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('core-js');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var HTTP = 'HTTP';
var SERVER = 'SERVER';

// provide httpBackend for testing
function createNector(endpoint, httpBackend) {
  function createTransport(loc) {

    var type = typeof loc === 'string' ? HTTP : SERVER;
    switch (type) {
      case HTTP:
        return createHttpTransport(loc, endpoint);
      case SERVER:
        return createServerTransport(loc._store);
    }
  }

  function runTransport(key, args, transport) {
    if (transport.apply) {
      return transport.apply(undefined, [key].concat(_toConsumableArray(args)));
    } else {
      return transport[key].apply(transport, _toConsumableArray(args));
    }
  }

  function createHttpTransport(loc) {
    return function httpTransport(key) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var json = JSON.stringify(args);
      var encoded = encodeURIComponent(json);
      httpBackend = httpBackend || _isomorphicFetch2['default'];
      return httpBackend('' + loc + endpoint + '/' + key + '?args=' + encoded).then(function (response) {
        return response.json();
      })['catch'](function (err) {
        console.log(err);
      });
    };
  }

  function createServerTransport(store) {
    return store;
  }

  function createClient(loc) {
    return function client(key) {
      var transport = createTransport(loc, endpoint);
      return function runRequest() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return runTransport(key, args, transport, endpoint);
      };
    };
  }

  function createServer(store, connect) {

    var app = connect;

    // provide store so that we can use this as a location
    app._store = _Object$assign({}, store, { endpoint: endpoint });

    app.use(endpoint + '/:key', function (req, res) {
      var key = req.params.key;
      var urlParts = _url2['default'].parse(req.url, true);
      var json = urlParts.query && urlParts.query.args;
      var args = json && JSON.parse(json) || [];
      var localClient = createClient(app);
      localClient(key).apply(undefined, _toConsumableArray(args)).then(function (data) {
        res.send(data);
      });
    });

    return app;
  }
  return { endpoint: endpoint, createServer: createServer, createClient: createClient };
}

exports['default'] = { createNector: createNector };
module.exports = exports['default'];
