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
 * Module dependencies.
 */


/**
 * Expose `WebsocketRouter` constructor.
 */
if (typeof(module) != "undefined" && typeof(exports) != "undefined")
  exports = module.exports = WebsocketRouter;

/**
 * Initialize a new `WebsocketBroker` with the given `options`.
 *
 * @param {Object} options
 * @api private
 */

function WebsocketRouter(options) {
  options = options || {};
  this.clientsPath = [];
  this.host = options.host ? options.host : 'localhost';
  this.port = options.port ? options.port : 8000;
}

/**
 * Initialize a new `WebsocketBroker` with the given `options`.
 *
 * @param {Object} options
 * @api private
 */

var pathToRegExp = function(path) {
  if (typeof(path) === 'string') {
      if (path === '*') {
          path = /^.*$/;
      }
      else {
          //path = path.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
          path = new RegExp('^' + path + '$');
      }
  }
  return path;
};

/**
 * Initialize a new `WebsocketBroker` with the given `options`.
 *
 * @param {Object} options
 * @api putblic
 */

WebsocketRouter.prototype.route = function(pathname, connection, wsHandlers, clients) {
  for(var path in wsHandlers) {
    var handler = wsHandlers[path];
    var pathExp = pathToRegExp(path);

    if (!(pathExp instanceof RegExp)) {
      throw new Error('Path must be specified as either a string or a RegExp.');
    }

    if (typeof handler === "function") {
      if (pathExp.test(pathname)) {
        wsHandlers[path](pathname, connection, clients);
      }
    } else {
      console.log("No request handler for this pathname: '" + pathname + "'");
    }
  }
}
