import createServer from './createServer';
import createClient from './createClient';

// provide httpBackend for testing
export default function createNector(endpoint, httpBackend){

  return {
    endpoint,
    createServer(store){
      return createServer(store, endpoint);
    },
    createClient(loc){
      return createClient(loc, endpoint, httpBackend);
    }
  };
}
