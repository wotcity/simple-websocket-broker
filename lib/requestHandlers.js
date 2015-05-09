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

if (typeof(Handlers) == "undefined") {
    var Handlers = {};
}

(function() {
  Handlers.send = function(pathname, connection, clients) {
    console.log("Routed: " + pathname + ' at worker [' + connection.worker.id + ']');

    // the original sender pathname
    connection.pathname = pathname;

    /*
     * convert sender pathname to viewer pathname
     * eg. '/object/mbedtaiwan/send' to '/object/mbedtaiwan/viewer'
     */
    var paths = pathname.split('/');

    // remove the rear string 'send'
    var viewer = paths.slice(0, -1).join('/');

    connection.viewer = viewer + '/viewer';
    connection.statusViewer = viewer + '/status';

    /*
     * initial storage for this viewer
     */
    for (var path in clients) {
        if (path === connection.viewer)
            return;
    }

    clients[connection.viewer] = [];
    clients[connection.statusViewer] = [];
  }

  Handlers.viewer = function(pathname, connection, clients) {
    console.log("Viewer Routed: " + pathname);

    // the original sender pathname
    connection.pathname = pathname;

    // Save viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing sender.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

  Handlers.status = function(pathname, connection, clients) {
    console.log("Status Routed: " + pathname);

    // the original sender pathname
    connection.pathname = pathname;

    // Save status viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing status viewer.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }
})();

if (typeof(module) != "undefined" && typeof(exports) != "undefined")
  module.exports = Handlers;