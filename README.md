# Nector

A promise driven functional transport layer for isomorphic apps.

_* please note API's are in flux here and will change as the project develops_

### What is Nector

Nector is a simple server middleware and client that allows you to easily run promise driven functions on the server from the client.

### Requirements

To use nector you need an express or connect driven node app with some clientside code that will proxy to your serverside services.

## Getting started

Add nector to your project

```js
$ npm install nector --save
```

On your server use nector to attach middleware to your connect driven server and define methods.

```js
// server.js
import express from 'express';

const app = express();

const nector = createNector('/nector'); // pass in endpoint

nector.createServer({

  sayHello(place){
    return new Promise(
      (resolve, reject) => {
        resolve(`Hello ${place}.`);
      }
    );
  }
  
  doSomethingElse(){
    return new Promise(/* set up promise... */);
  }

}, app);

app.listen(3000);
```

Within your client code create a remote client and call a method.

```js
const nector = createNector('/nector'); // pass in endpoint

const remoteClient = nector.createClient('http://localhost'); // pass in full location of your server
const sayHello = remoteClient('sayHello'); // Pass in the name of the remote method you wish to call

sayHello('World')
  .then((answer) => {
    console.log(answer); // 'Hello World'
  });
```






