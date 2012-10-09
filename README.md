Omnes Project
===

The project has a tree, very nice!!

## Environment Set

* node_env = production | development  
  Default(production) to connect remote MongoDB Server, except for `node_env=development` that use local MongoDB.

* node_port = 3000 | HTTP_PORT  
  Default to 3000 unless you set other port.


	$ cd PROJECT/PATH
	$ mongod --dbpath=./dbs
	$ node server.js
	$ curl http://localhost:3000/
