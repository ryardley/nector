'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createServer;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _createClient = require('./createClient');

var _createClient2 = _interopRequireDefault(_createClient);

function createServer(store, connect, endpoint) {

  var app = connect;

  // provide store so that we can use this as a location
  app._store = _Object$assign({}, store, { endpoint: endpoint });

  app.use(endpoint + '/:key', function (req, res) {
    var key = req.params.key;
    var urlParts = _url2['default'].parse(req.url, true);
    var json = urlParts.query && urlParts.query.args;
    var args = json && JSON.parse(json) || [];
    var localClient = (0, _createClient2['default'])(app);
    localClient(key).apply(undefined, _toConsumableArray(args)).then(function (data) {
      res.send(data);
    });
  });

  return app;
}

module.exports = exports['default'];