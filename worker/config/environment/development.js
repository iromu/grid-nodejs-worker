'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/grid-dev'
  },
  redis: {
    uri: 'redis://localhost:6379'
  },
  socket: {
    endpoint: 'http://localhost:9000'
  },
  seedDB: true
};
