import {createNector} from '..';
import {expect} from 'chai';
import {check} from './helpers';
import request from 'supertest';
import express from 'express';

describe('nector', () => {
  let nector, server, localClient, remoteClient;

  beforeEach(()=>{

    const mockBackend = () => {
      return new Promise((resolve) => {
        const mockRequest = {
          json: () => {
            return new Promise((res) => {
              res('Return via HTTP.');
            });
          }
        };
        resolve(mockRequest);
      });

    };

    nector = createNector('/hello', mockBackend);
    server = nector.createServer({
      myService(...args){
        return new Promise((resolve)=>{
          resolve(`${args}`);
        });
      }
    }, express());
    localClient = nector.createClient(server);
    remoteClient = nector.createClient('http://localhost');
  });

  it('should create a listenable server', (done) => {
    const json = JSON.stringify([1,2,3]);
    const encoded = encodeURIComponent(json);
    request(server)
    .get(`/hello/myService?args=${encoded}`)
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      check(done, () => {
        expect(res.text).to.equal('1,2,3');
      });
    });
  });

  it('should create local client', (done) => {

    expect(server._store.endpoint).to.equal('/hello');
    expect(server.use).to.be.a('function');

    localClient('myService')(1,2,3)
      .then((res)=>{
        check(done, () => {
          expect(res).to.equal('1,2,3');
        });
      });
  });

  it('should create remote client', (done) => {
    remoteClient('myService')(1,2,3)
      .then((res) => {
        check(done, () => {
          expect(res).to.equal('Return via HTTP.');
        });
      });
  });
});
