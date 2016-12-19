var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var index = require('../index');
var config = require('../config.json');


app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/socket.io.js', function(req, res){
	res.sendFile(__dirname + '/public/socket.io.js');
});

io.on('connection', function(socket) {
	console.log('nova connexió');
	socket.emit('updateIPsWeb', config.ips);

	/**	IPs Servidors Caspar	**/
	socket.on('updateIPs', function(ips) {
		console.log('He rebut:', ips);
	});

	/**	Mostrar Logo Invencibles **/
	socket.on('LogoInPlato', function() {
		console.log('He rebut: Logo IN Plato');
	});
	socket.on('LogoOutPlato', function() {
		console.log('He rebut: Logo OUT Plato');
	});
	socket.on('LogoInDSK', function() {
		console.log('He rebut: Logo IN DSK');
	});
	socket.on('LogoOutDSK', function() {
		console.log('He rebut: Logo OUT DSK');
	});

	/**	Mostrar Text **/
	socket.on('customTextIn', function(customTextInput) {
		console.log('He rebut: Custom Text In', customTextInput)
	});
	socket.on('customTextOut', function() {
		console.log('He rebut: Custom Text Out');
	});

	/**	Mostrar Puntuació **/
	socket.on('puntsIn', function(punts) {
		console.log('He rebut: Punts IN', punts);
	});
	socket.on('puntsOut', function() {
		console.log('He rebut: Punts OUT');
	});

	/**	Mostrar Cronòmetre **/
	socket.on('cronoIn', function(tempsCrono) {
		console.log('He rebut: Crono IN', tempsCrono);
	});
	socket.on('cronoStart', function() {
		console.log('He rebut: Crono START');
	});
	socket.on('cronoStop', function() {
		console.log('He rebut: Crono STOP');
	});
	socket.on('cronoOut', function() {
		console.log('He rebut: Crono OUT');
	});


});

http.listen(80, function() {
	console.log('Escoltant a localhost:80');
});
