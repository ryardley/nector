'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createClient;

var _transport = require('./transport');

function createClient(loc, endpoint, httpBackend) {
  return function client(key) {
    var transport = (0, _transport.createTransport)(loc, endpoint, httpBackend);
    return function runRequest() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _transport.runTransport)(key, args, transport);
    };
  };
}

module.exports = exports['default'];