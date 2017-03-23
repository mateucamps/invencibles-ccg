var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('../config.json');
var Caspar = require('../lib/caspar');
var casparPlato = new Caspar(config.ips.ipCasparPlato);
var casparDSK = new Caspar(config.ips.ipCasparDSK);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/socket.io.js', function(req, res){
	res.sendFile(__dirname + '/public/socket.io.js');
});

app.get('/moment.min.js', function(req, res){
	res.sendFile(__dirname + '/public/moment.min.js');
});

app.get('/jquery-3.1.1.min.js', function(req, res){
	res.sendFile(__dirname + '/public/jquery-3.1.1.min.js');
});

io.on('connection', function(socket) {
	console.log('nova connexió');
	socket.emit('updateIPsWeb', config.ips); //REVISAR

	/**	IPs Servidors Caspar	**/
	socket.on('updateIPs', function(ips) {
		console.log('[FALTA IMPLEMENTAR] He rebut:', ips); //REVISAR
    /*
		config.ips = ips;
		index.casparPlato.ccgInit(ips.ipCasparPlato);
		index.casparDSK.ccgInit(ips.ipCasparDSK);
    */
	});

  /** Control CasparCG **/
  socket.on('clearAll', function() {
    console.log('He rebut: Clear ALL');
    casparPlato.clearAll();
    casparDSK.clearAll();
  });


	/**	Mostrar Logo Invencibles **/
	socket.on('LogoInPlato', function() {
		console.log('He rebut: Logo IN Plato');
		casparPlato.templateIn('invencibles\\logo_fullscreen', {});
	});
	socket.on('LogoOutPlato', function() {
		console.log('He rebut: Logo OUT Plato');
		casparPlato.templateOut();
	});
	socket.on('LogoInDSK', function() {
		console.log('He rebut: Logo IN DSK');
		casparDSK.templateIn('invencibles\\logo_fullscreen', {});
	});
	socket.on('LogoOutDSK', function() {
		console.log('He rebut: Logo OUT DSK');
		casparDSK.templateOut();
	});

	/**	Mostrar Text **/
	socket.on('customTextIn', function(customTextInput) {
		console.log('He rebut: Custom Text In', customTextInput)
		casparPlato.templateIn('invencibles\\textplato_fullscreen', {'f0':customTextInput} );
	});
	socket.on('customTextOut', function() {
		console.log('He rebut: Custom Text Out');
		casparPlato.templateOut();
	});

	/**	Mostrar Puntuació **/
	socket.on('puntsIn', function(punts) {
		console.log('He rebut: Punts IN', punts);
		casparPlato.templateIn (
			'invencibles\\recompte_fullscreen',
      {'f0':punts.vermell,'f1':punts.blau}
		);
		casparDSK.templateIn (
			'invencibles\\recompte_dsk',
      {'f0':punts.vermell,'f1':punts.blau}
		);
	});
	socket.on('puntsOut', function() {
		console.log('He rebut: Punts OUT');
		casparPlato.templateMethod('outro');
		casparDSK.templateMethod('outro');
	});

	/**	Mostrar Cronòmetre **/
	socket.on('cronoIn', function(tempsCrono) {
		console.log('He rebut: Crono IN', tempsCrono);

    casparPlato.templateIn('invencibles\\compta_fullscreen', {'f0':tempsCrono} );

    casparDSK.templateIn('invencibles\\compta_inf_esq', {'f0':tempsCrono} );
	});
	socket.on('cronoStart', function(tempsCrono) {
		console.log('He rebut: Crono START', tempsCrono);
    casparPlato.templateUpdate( {'f0':String(tempsCrono)} );
    casparDSK.templateUpdate( {'f0':String(tempsCrono)} );
	});
	socket.on('cronoStop', function() {
		console.log('He rebut: Crono STOP');
	});
	socket.on('cronoOut', function() {
		console.log('He rebut: Crono OUT');

    casparDSK.templateOut();
    casparPlato.templateOut();
	});

  /** Comptador Punts Individual **/
  socket.on('puntsIndivIn', function(num) {
    console.log('He rebut: Punts IN');
    casparPlato.templateIn('invencibles\\compta_fullscreen', {'f0':num} );
    casparDSK.templateIn('invencibles\\compta_inf_esq', {'f0':num} );
  });

  socket.on('puntsIndivOut', function() {
    console.log('He rebut: Punts OUT');
    casparPlato.templateOut();
    casparDSK.templateOut();
  });

  socket.on('puntsIndivSuma1', function(num) {
    console.log('He rebut: Suma 1', num);
    casparPlato.templateUpdate( {'f0':num} );
    casparDSK.templateUpdate( {'f0':num} );
  });

  socket.on('puntsIndivResta1', function(num) {
    console.log('He rebut: Resta 1');
    casparPlato.templateUpdate( {'f0':num} );
    casparDSK.templateUpdate( {'f0':num} );
  });

  /** Comptador Punts Doble **/
  socket.on('puntsDobleIn', function(numV, numB) {
    console.log('He rebut: Punts Doble IN', numV, numB);

  });


});

http.listen(80, function() {
	console.log('Escoltant a localhost:80');
});
