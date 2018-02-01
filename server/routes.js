var express = require('express'),
	router= express.Router(),
	home = require('../controllers/home'),
	image = require('../controllers/device');

module.exports = function(app){
	router.get('/',home.index);
	router.get('/data',image.data);
	router.get('/camera/:id',image.camera);
	router.post('/message',image.message);
	app.use(router);
};
