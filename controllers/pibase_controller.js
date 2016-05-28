/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();


router.get('/', function(req,res) {
	res.send('index.html');
});

module.exports = router;