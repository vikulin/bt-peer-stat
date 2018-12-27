var express = require("express");
const { discover } = require('scrape-torrent-stats')
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});


const config = {
  source: 'dht',
  waitTime: 10000 // 10 second wait before closing peer search
}

app.get("/peers/:infohash", (req, res, next) => {

 var infohash = req.params.infohash;
 
// ubuntu desktop magnet uri
const uri =
  'magnet:?xt=urn:btih:'.concat(infohash);
	
discover(uri, config)
  .then(result => {
    console.log(result)
    // Structure of result object can be seen further down
	res.json(result);
     })
  .catch(err => {
    console.error(err)
  })
 //res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});