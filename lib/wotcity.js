/**
 *
 *  .CITY Websocket Broker
 *  Copyright 2015 WoT.City Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

 "use strict";

/**
 * Expose `createApplication()`.
 */
 if (typeof(module) != "undefined" && typeof(exports) != "undefined")
  exports = module.exports = createApplication;

 /**
 * Module dependencies.
 */
var WebsocketBroker = require("./server")
  , WebsocketRouter = require("./router")
  , RequestHandlers = require("./requestHandlers")
  , merge = require('utils-merge');

/**
 * Websocket URL Router
 */
var wsHandlers = {
   "/object/([A-Za-z0-9-]+)/send": RequestHandlers.send,
   "/object/([A-Za-z0-9-]+)/viewer": RequestHandlers.viewer,
   "/object/([A-Za-z0-9-]+)/status": RequestHandlers.status
};

/*
 * Prototype and Class
 */
var Application = {};

/**
 * Start a Websocket server.
 *
 * @return {None}
 * @api public
 */
Application.start = function() {
  var server = new WebsocketBroker();
  var router = new WebsocketRouter();
  server.start(router.route, wsHandlers);
};

/**
 * Create an WoT application.
 *
 * @return {Object}
 * @api public
 */
function createApplication(options) {
  return merge(Application, options);
}