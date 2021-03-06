
const Hapi = require('hapi');

const host = '172.16.0.106';
const port = 3000; 

const server = Hapi.Server({
    host: host,
    port: port
});

const init = async () => {

    await server.start();
    console.log("Server up and running at port: " + port);

}

//Setup the routes
require('./routes/routes')(server);

init();