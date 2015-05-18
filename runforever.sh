#!/usr/bin/env bash
cd dist

NODE_ENV=production \
PORT=8090 \
APP_UID="grid-nodejs-worker-01" \
SOCKET_ENDPOINT="http://localhost:8080" \
forever start --uid "grid-nodejs-worker-01" -w -a worker/app.js

NODE_ENV=production \
PORT=8091 \
APP_UID="grid-nodejs-worker-02" \
SOCKET_ENDPOINT="http://localhost:8081" \
forever start --uid "grid-nodejs-worker-02" -w -a worker/app.js

