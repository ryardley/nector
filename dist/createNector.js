'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createNector;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _createServer2 = require('./createServer');

var _createServer3 = _interopRequireDefault(_createServer2);

var _createClient2 = require('./createClient');

var _createClient3 = _interopRequireDefault(_createClient2);

// provide httpBackend for testing

function createNector(endpoint, httpBackend) {

  return {
    endpoint: endpoint,
    createServer: function createServer(store, connect) {
      return (0, _createServer3['default'])(store, connect, endpoint);
    },
    createClient: function createClient(loc) {
      return (0, _createClient3['default'])(loc, endpoint, httpBackend);
    }
  };
}

module.exports = exports['default'];