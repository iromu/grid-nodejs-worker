(function () {
  /**
   * Main application file
   */

  'use strict';

//add timestamps in front of log messages
  require('console-stamp')(console, '[HH:MM:ss.l]');

// Set default node environment to development
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  var express = require('express');

  var config = require('./config/environment');


// Setup server
  var app = express();
  var server = require('http').createServer(app);


// Connect to server
  var io = require('socket.io-client')
  var socketio = io.connect(config.socket.endpoint, {path: '/socket.io-client', reconnect: true, return_buffers: true});

  require('./config/socketio')(socketio);
  require('./config/express')(app);
  require('./routes')(app);

// Start server
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

// Expose app
  exports = module.exports = app;
}());
