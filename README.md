# TEWC-Node

TEWC means The Easiest Web Chat while Node stands for [**NodeJS**](https://github.com/joyent/node), the famous Javascript framework.
TEWC is a multiuser and multiroom webchat that allows you to create rooms, to do public discussions and private as well.
It's a real-time web application, thanks to the WebSocket of HTML5.

## Requirements

To use this webchat you need NodeJS of course and [**socket.io**](https://github.com/learnboost/socket.io).
So install any requirements:

```bash
$ sudo apt-get install npm
$ npm install socket.io
```

## Usage

Now you're ready to use TEWC-Node!
Download it first:

```bash
$ cd /var/www
$ git clone https://github.com/wilk/TEWC-Node
$ cd TEWC-Node
$ node server/Server.js
```

Now open your browser at **http://localhost/TEWC-Node/client** and have fun!

However, if you want to run TEWC-Node on a different server, change the *config.json* file as follows:

```javascript
{
	baseURI: 'www.mywebsite.com' ,
	port: 30000
}
```

## License
(GNU GPLv3)

Copyright (c) 2012 Vincenzo Ferrari <wilk3ert@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
