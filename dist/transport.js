'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createTransport = createTransport;
exports.runTransport = runTransport;
var HTTP = 'HTTP';
var SERVER = 'SERVER';

function createTransport(loc, endpoint, httpBackend) {
  var type = typeof loc === 'string' ? HTTP : SERVER;
  switch (type) {
    case HTTP:
      return createHttpTransport(loc, endpoint, httpBackend);
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

function createServerTransport(store) {
  return store;
}

function createHttpTransport(loc, endpoint, httpBackend) {
  return function httpTransport(key) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var json = JSON.stringify(args);
    var encoded = encodeURIComponent(json);
    httpBackend = httpBackend || fetch;
    return httpBackend('' + loc + endpoint + '/' + key + '?args=' + encoded).then(function (response) {
      return response.json();
    })['catch'](function (err) {
      console.log(err);
    });
  };
}