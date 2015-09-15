import {createTransport, runTransport} from './transport';

export default function createClient(nector, loc, endpoint, httpBackend){
  if(!loc) {
    if(typeof window !== 'undefined'){
      loc = window.location.origin;
    }else if(nector.servers && nector.servers.length > 0){
      loc = nector.servers[0];
    }else{
      throw new Error('Please supply a sever location. Nector could not find an active server on this system to fall back to.');
    }
  }
  return function client(key){
    const transport = createTransport(nector, loc, endpoint, httpBackend);
    return function runRequest(...args){
      return runTransport(key, args, transport);
    };
  };
}
