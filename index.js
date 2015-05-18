'use strict';

var InfiniteLoop = require('infinite-loop');

//add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
//var socketio = require('socket.io')(server, {
//  serveClient: (config.env === 'production') ? false : true,
//  path: '/socket.io-client'
//});
//require('./config/socketio')(socketio);
//
require('./config/express')(app);
////require('./routes')(app);
//
//// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


exports = module.exports = app;

module.exports = function (str) {


  var WebSocket = require('ws');

  var ws = new WebSocket('ws://echo.websocket.org/', {
    protocolVersion: 8,
    origin: 'http://websocket.org'
  });

  ws.on('open', function open() {
    console.log('connected');
    ws.send(Date.now().toString(), {mask: true});
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });

  ws.on('message', function message(data, flags) {
    console.log('Roundtrip time: ' + (Date.now() - parseInt(data)) + 'ms', flags);

    setTimeout(function timeout() {
      ws.send(Date.now().toString(), {mask: true});
    }, 500);
  });


  var ws2 = new WebSocket('ws://localhost:9000/socket.io-client', {origin: 'http://localhost:9000'});

  ws2.on('open', function open() {
    ws2.send('socket:info');
    ws2.send('pixel:buffer:request');
  });

  ws2.on('socket:info', function (data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.

    console.info('[%s] socket:info %s', socket.id, JSON.stringify(data, null, 2));
  });

  //ws.send('socket:info');
  //var il = new InfiniteLoop;
  //
  ////simple ++ counter example
  //var counter = 0;
  ////task you want to run infinitely
  //function addOne(n) {
  //  n++;
  //  console.log(n);
  //}
  //
  ////add it by calling .add
  //il.add(addOne, counter);
  //
  //il.run();
  //
  //setTimeout( function(){
  //  il.stop();
  //} , 10 * 1000);


  console.log(str || 'loop');
  // this code is run twice
// see implementation notes below
  console.log('twice ' + process.pid);

// after this point, we are a daemon
  //require('daemon')();

// different pid because we are now forked
// original parent has exited
  console.log('diff ' + process.pid);
};
