import createServer from './createServer';
import createClient from './createClient';

// provide httpBackend for testing
export default function createNector(endpoint, httpBackend){

  return {
    endpoint,
    createServer(store, connect){
      return createServer(store, connect, endpoint);
    },
    createClient(loc){
      return createClient(loc, endpoint, httpBackend);
    }
  };
}
