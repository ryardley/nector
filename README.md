# Nector

A promise driven functional transport layer for isomorphic apps.

_* Please note API's are not fixed here and will change as the project develops. No guarantees. No warrantees. If it doesnt work or you are lost and need someone to help you, please send me an email, file an issue or submit a PR and be the awesome person you were born to be!_

### What is Nector

Nector is a simple server middleware and client that allows you to easily run promise driven functions on the server from the client.

### Requirements

To use nector you need an express or connect driven node app with some clientside code that will proxy to your serverside services.

## Getting started

Add nector to your project

```bash
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

const remoteClient = nector.createClient('http://localhost'); // pass in full location of your server or nothing and the client will use the window.location.origin
const sayHello = remoteClient('sayHello'); // Pass in the name of the remote method you wish to call

sayHello('World')
  .then((answer) => {
    console.log(answer); // 'Hello World'
  });
```

## NOTE: Mock express dependency for your clientside code

Nector depends on express to run it's endpoint server. If you want to create a client within webpack you should mock out this dependency to ensure it is isomorphic. 

If you want to make clients that bypass the http transport layer you will need to mock express as part of your browserify or webpack build process

Here is an example webpack config:

```js
  //...
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      express: path.resolve(__dirname, 'src', 'client', 'express')
    }
  },
  //...
```

I am looking for better ways to do this and would love to hear some suggestions but for now this is a reasonable solution to get you going.
