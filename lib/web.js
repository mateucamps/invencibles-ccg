var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var index = require('../index');
var config = require('../config.json');

// Plagiat de Stack Overflow
// http://stackoverflow.com/questions/30625449/javascript-chained-concatenation-function
function concatenate() {
    return {
        args: Array.from(arguments), // ES6 for simplicity
        using: function(separator) {
            return this.args.join(separator);
        },
        toString: function() {
            return this.args.join("");
        }
    };
}

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/socket.io.js', function(req, res){
	res.sendFile(__dirname + '/public/socket.io.js');
});

app.get('/moment.min.js', function(req, res){
	res.sendFile(__dirname + '/public/moment.min.js');
});

io.on('connection', function(socket) {
	console.log('nova connexió');
	socket.emit('updateIPsWeb', config.ips);

	/**	IPs Servidors Caspar	**/
	socket.on('updateIPs', function(ips) {
		console.log('He rebut:', ips);
		config.ips = ips;
		index.casparPlato.ccgInit(ips.ipCasparPlato);
		index.casparDSK.ccgInit(ips.ipCasparDSK);
	});

  /** Control CasparCG **/
  socket.on('clearAll', function() {
    console.log('He rebut: Clear ALL');
    index.casparPlato.clearAll();
    index.casparDSK.clearAll();
  });


	/**	Mostrar Logo Invencibles **/
	socket.on('LogoInPlato', function() {
		console.log('He rebut: Logo IN Plato');
		index.casparPlato.templateIn('invencibles\\logo_fullscreen', "f0", "hola");
	});
	socket.on('LogoOutPlato', function() {
		console.log('He rebut: Logo OUT Plato');
		index.casparPlato.templateOut();
	});
	socket.on('LogoInDSK', function() {
		console.log('He rebut: Logo IN DSK');
		index.casparDSK.templateIn('invencibles\\logo_fullscreen', "", "");
	});
	socket.on('LogoOutDSK', function() {
		console.log('He rebut: Logo OUT DSK');
		index.casparDSK.templateOut();
	});

	/**	Mostrar Text **/
	socket.on('customTextIn', function(customTextInput) {
		console.log('He rebut: Custom Text In', customTextInput)
		index.casparPlato.templateIn('invencibles\\textplato_fullscreen', "f0", customTextInput);
	});
	socket.on('customTextOut', function() {
		console.log('He rebut: Custom Text Out');
		index.casparPlato.templateOut();
	});

	/**	Mostrar Puntuació **/
	socket.on('puntsIn', function(punts) {
		console.log('He rebut: Punts IN', punts);
		index.casparPlato.templateIn (
			'invencibles\\recompte_fullscreen',
			"f0;f1",
			concatenate(punts.vermell,punts.blau).using(';')
		);
		index.casparDSK.templateIn (
			'invencibles\\recompte_dsk',
			"f0;f1",
			concatenate(punts.vermell,punts.blau).using(';')
		);
	});
	socket.on('puntsOut', function() {
		console.log('He rebut: Punts OUT');
		index.casparPlato.templateMethod('outro');
		index.casparDSK.templateMethod('outro');
	});

	/**	Mostrar Cronòmetre **/
	socket.on('cronoIn', function(tempsCrono) {
		console.log('He rebut: Crono IN', tempsCrono);

    index.casparPlato.templateIn('invencibles\\compta_fullscreen', "f0", tempsCrono);

    index.casparDSK.templateIn('invencibles\\compta_inf_esq', "f0", tempsCrono);
	});
	socket.on('cronoStart', function(tempsCrono) {
		console.log('He rebut: Crono START', tempsCrono);
    index.casparPlato.templateUpdate('f0', String(tempsCrono));
    index.casparDSK.templateUpdate('f0', String(tempsCrono));
	});
	socket.on('cronoStop', function() {
		console.log('He rebut: Crono STOP');
	});
	socket.on('cronoOut', function() {
		console.log('He rebut: Crono OUT');

    index.casparDSK.templateOut();
    index.casparPlato.templateOut();
	});

  /** Comptador Punts Individual **/
  socket.on('puntsIndivIn', function(num) {
    console.log('He rebut: Punts IN');
    index.casparPlato.templateIn('invencibles\\compta_fullscreen', "f0", num);
    index.casparDSK.templateIn('invencibles\\compta_inf_esq', "f0", num);
  });

  socket.on('puntsIndivOut', function() {
    console.log('He rebut: Punts OUT');
    index.casparPlato.templateOut();
    index.casparDSK.templateOut();
  });

  socket.on('puntsIndivSuma1', function(num) {
    console.log('He rebut: Suma 1', num);
    index.casparPlato.templateUpdate('f0', num);
    index.casparDSK.templateUpdate('f0', num);
  });

  socket.on('puntsIndivResta1', function(num) {
    console.log('He rebut: Resta 1');
    index.casparPlato.templateUpdate('f0', num);
    index.casparDSK.templateUpdate('f0', num);
  });

  /** Comptador Punts Doble **/
  socket.on('puntsDobleIn', function(numV, numB) {
    console.log('He rebut: Punts Doble IN', numV, numB);

  });


});

http.listen(80, function() {
	console.log('Escoltant a localhost:80');
});
