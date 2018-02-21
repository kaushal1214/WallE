/*---------------------------------------------------
* File: Server.js
* Purpose: To create a server using Express
*---------------------------------------------------*/

var app = require('express')();
var config = require('./server/configure');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const   MOTOR1A = 12,
	MOTOR1B = 16,
	MOTOR2A = 20,
	MOTOR2B = 21;

//GPIO controller
var Gpio = require('pigpio').Gpio,
	motor1A = new Gpio(MOTOR1A,{mode: Gpio.OUTPUT}),
	motor1B = new Gpio(MOTOR1B,{mode: Gpio.OUTPUT}),
	motor2A = new Gpio(MOTOR2A,{mode: Gpio.OUTPUT}),
        motor2B = new Gpio(MOTOR2B,{mode: Gpio.OUTPUT});

var LCD = require('lcd'),
	lcd =  new LCD({
		rs: 3,
		e: 2,
		data: [6,13,19,26],
		cols: 20,
		row: 4
	});

//To detect if the LCD is ready to print
var READY = false;

lcd.on('ready',function(){
	READY = true;
	lcd.setCursor(0,0);
	lcd.print("",function(err){
		if(err) throw err;
	});
});
app.set('port',process.env.PORT || 3300);
app.set('views',__dirname + '/views');
app = config(app);

http.listen(3300,function(){
console.log('Server up and running at 3300 port');
});

//Socket.io connection
io.on('connection',function(client){
	client.on('Message',function(data){
		console.log(data.data);
                if(READY)
		{
			lcd.clear();
			lcd.setCursor(0,0);
			lcd.print(data.data,function(err){
				if(err) throw err;
			});
		}
	});

	//To handle KeyUp event from the user
	client.on('keyUp',function(data){
		console.log("Keyup: "+data.key);

		//To stop both motors
		motor(0,0,0,0);

	});

	//To Handle KeyPress event from the Client
	client.on('keyPress', function(data){
		console.log('The keypressed is: '+ data.key);
		if(data.key=="ArrowUp")
		{
			//Move Forward
			motor(1,0,1,0);
		}
		else if(data.key=="ArrowDown")
		{
			//Move Backward
			motor(0,1,0,1);
		}
		else if(data.key=="ArrowLeft")
		{
			//Mode Left
			motor(1,0,0,0);

		}
		else if(data.key=="ArrowRight")
		{
			//Move Right
			motor(0,0,1,0);

		}
	});
});

function motor(m1A,m1B,m2A,m2B)
{
	motor1A.digitalWrite(m1A);
	motor1B.digitalWrite(m1B);
	motor2A.digitalWrite(m2A);
	motor2B.digitalWrite(m2B);
}


//To handle the Interrupt 'Ctrl+C' and close the LCD gracefully
process.on('SIGINT', function(){
	console.log("Server is closed!");
	lcd.close();
	process.exit();
});
