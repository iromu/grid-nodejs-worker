/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var _ = require('lodash');
var roomName = 'greyWorker';

var processPixels = function (pixels) {

  pixels.forEach(function (item) {
    item.s = Math.round((item.r + item.g + item.b) / 3);
  });

};

var addListeners = function (socket) {
  socket.on('message', function (message) {
    console.log('Message from server: ' + message);
  });

  socket.on('room:joined', function (room) {
    console.log('room:joined ' + room);
    socket.emit('pixel:buffer:request', room);
  });

  socket.on('pixel:put:end', function (room) {
    socket.emit('pixel:buffer:request', room);
  });

  socket.on('pixel:buffer:response', function (pixels, room) {
    if (Array.isArray(pixels) && pixels.length > 0) {
      processPixels(pixels);

      socket.emit('pixel:put', pixels, room);
    } else {
      console.warn('onPixelBufferResponse() empty array received for processing.');
    }
  });
};
module.exports = function (socket) {

  socket.on('connect', function () {
    console.info('CONNECTED');
    addListeners(socket);
    socket.emit('room:join', roomName);
  });
};
