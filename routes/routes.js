const { discover } = require('scrape-torrent-stats');

const config = {
  source: 'dht',
  waitTime: 1000 // 10 second wait before closing peer search
}

module.exports = function(server) {
    //About route
    server.route({
        method: 'GET',
        path: '/calculator/about',
        handler: function (request, h) {
    
            var data = {
                message: 'Welcome to our Calculator Service'
            };
    
            return data;
        }
    });

    //Add route
    server.route({
        method: 'GET',
        path: '/calculator/add/{num1}/{num2}',
        handler: function (request, h) {

            const num1 = parseInt(request.params.num1);
            const num2 = parseInt(request.params.num2);

            var data = {
                answer: num1 + num2
            };
    
            return data;
        }
    });

    //Subtract route
    server.route({
        method: 'GET',
        path: '/peers/{infohash}',
        handler: function (request, h) {

			 var infohash = request.params.infohash;
 
			// ubuntu desktop magnet uri
			const uri = 'magnet:?xt=urn:btih:'.concat(infohash);

			var result = discover(uri, config)
			  .then(result => {
					// Structure of result object can be seen further down
					var json = '{"peers":'+Object.keys(result.peersObj).length+'}';
					console.log(json);
					return json;
				 })
			  .catch(err => {
				console.error(err)
			  })
            return result;
        }
    });

    //Multiply route
    server.route({
        method: 'GET',
        path: '/calculator/multi/{num1}/{num2}',
        handler: function (request, h) {

            const num1 = parseInt(request.params.num1);
            const num2 = parseInt(request.params.num2);

            var data = {
                answer: num1 * num2
            };
    
            return data;
        }
    });

    //Division route
    server.route({
        method: 'GET',
        path: '/calculator/div/{num1}/{num2}',
        handler: function (request, h) {

            const num1 = parseInt(request.params.num1);
            const num2 = parseInt(request.params.num2);

            var data = {
                answer: num1 / num2
            };
    
            return data;
        }
    });
}