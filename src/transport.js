import fetch from 'isomorphic-fetch';

const HTTP = 'HTTP';
const SERVER = 'SERVER';

export function createTransport(loc, endpoint, httpBackend){
  const type = (typeof loc === 'string') ? HTTP : SERVER;
  switch(type){
  case HTTP:
    return createTransportHTTP(loc, endpoint, httpBackend);
  case SERVER:
    return createTransportServer(loc._store);
  }
}

export function runTransport(key, args, transport){
  if(transport.apply){
    return transport(key, ...args);
  }else{
    return transport[key](...args);
  }
}

function createTransportServer(store){
  return store;
}

function createTransportHTTP(loc, endpoint, httpBackend){
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
