/*---------------------------------------------------
* File: Server.js
* Purpose: To create a server using Express
*---------------------------------------------------*/

var app = require('express')();
var config = require('./server/configure');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Twilio Credentials
const accountSid = 'AC55b6fbdd75183c5a57d5353e04f26b32';
const authToken = '7fa59fe3498bd1887b15f4e08898b687';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);




app.set('port',process.env.PORT || 3300);
app.set('views',__dirname + '/views');
app = config(app);

mongoose.connect("mongodb://localhost/iot");
mongoose.connection.on('open',function(){
	console.log("Mongoose Connected");
});

io.on('connection', function(){
	console.log('A new Client connected');
});

http.listen(3300,function(){
console.log('Server up and running at 3300 port');

});

var twilioMsg = function(){

        client.messages
                  .create({
                    to: '+917679480088',
                    from: '+16154423004',
                    body: 'The Artefact has been misplaced.',
          })
        .then((message) => console.log(message.sid));


}

app.post('/artefactUpdate', function(req,res){
	console.log('ID:'+req.body.id);
	io.emit('State Changed', { id: req.body.id,
				   state: req.body.state}
	);

	twilioMsg();

	//Server reply
	res.json({Status:'Ok'});
});

