import createServer from './createServer';
import createClient from './createClient';

// provide httpBackend for testing
export default function createNector(endpoint, httpBackend){

  return {
    endpoint,
    servers:[],
    createServer(store){
      const srv = createServer(this, store, endpoint);
      this.servers.push(srv);
      return srv;
    },
    createClient(loc){
      return createClient(this, loc, endpoint, httpBackend);
    }
  };
}
