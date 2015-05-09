# dotcity-websocket-broker

Websocket broker (channel) server for IoT devices. Help makers making Internet of Personal Things.

1. [Install](#install)
2. [Usage](#usage)
3. [Discussion](#discussion)
4. [How To Report Bugs](#how-to-report-bugs)
5. [Authors](#authors)

## Install

1. [Download dotcity-websocket-broker](https://github.com/wotcity/dotcity-websocket-broker/releases).
2. Run `$ cd dotcity-websocket-broker` to change the directory.
3. Run `$ npm install` to install the dependencies if you don't already have them.
4. Run `$ node index.js` to start the broker server.

Please try `ws://wot.city` at [WoT.City](http://wotcity.com) first before you start your own IoT cloud.

### Prerequisites

1. [Node.js](https://nodejs.org). Note: Node should be with a version above 0.10.x.

## Usage

To send the data over the Internet, IoT devices should use the url below to establish a connection with the server.

```
ws://[hostname]/object/[name]/send
```

You must specify an object name and your hostname. For example:

```
ws://wot.city/object/554785c7173b2e5563000007/send
```

To receive data from the server, the frontend should use the url below to establish a connection with the server.

```
ws://[hostname]/object/[name]/viewer
```

Also, you need to specify the object name and hostname. For example:

```
ws://wot.city/object/554785c7173b2e5563000007/viewer
```

An physical object has two significant resources, *send* and *viewer*. *send* is to send device data to WoT.City, and WoT.City receives data streams over Websocket connection. *viewer* is used by frontend to receive real-time data over the connection.

dotcity-websocket-broker is a broker that it receives sensor data over Websocket connection and routes data streams to frontend Websocket clients.

## Discussion

There are various ways to get involved with .CITY Websocket Broker. We're looking for help identifying bugs, writing documentation and contributing codes.

Most of the .CITY Websocket Broker developers, users and contributors are at WeChat group or IRC channel. You can find us in the [#wotcity](http://webchat.freenode.net/?channels=wotcity) IRC channel on irc.freenode.net. You can get information of how to join WeChat group at [#wotcity](http://webchat.freenode.net/?channels=wotcity).

## How to Report Bugs

Bugs are reported via [https://github.com/wotcity/dotcity-websocket-broker](https://github.com/wotcity/dotcity-websocket-broker).

## Authors

Authors ordered by first contribution.

- Jollen `<jollen@jollen.org>`