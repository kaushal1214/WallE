/*---------------------------------------------------
* File: Server.js
* Purpose: To create a server using Express
*---------------------------------------------------*/

var app = require('express')();
var config = require('./server/configure');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*
var LCD = require('lcd'),
	lcd =  new LCD({
		rs: 3,
		e: 2,
		data: [6,13,16,19],
		cols: 20,
		row: 4
	});

var READY = false;

lcd.on('ready',function(){
	READY = true;
}); */
app.set('port',process.env.PORT || 3300);
app.set('views',__dirname + '/views');
app = config(app);

http.listen(3300,function(){
console.log('Server up and running at 3300 port');
});
io.on('connection',function(client){
	client.on('Message',function(data){
		console.log(data.data);
	});
});
