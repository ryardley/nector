import {createTransport, runTransport} from './transport';

export default function createClient(loc, endpoint, httpBackend){
  return function client(key){
    const transport = createTransport(loc, endpoint, httpBackend);
    return function runRequest(...args){
      return runTransport(key, args, transport);
    };
  };
}
