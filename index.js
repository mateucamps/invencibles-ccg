var Web = require('./lib/web');
var config = require('./config.json');

var casparPlato = require('./lib/caspar1');
var casparDSK = require('./lib/caspar2');

casparDSK.ccgInit(config.ips.ipCasparDSK);
casparPlato.ccgInit(config.ips.ipCasparPlato);

exports.casparPlato = casparPlato;
exports.casparDSK = casparDSK;

console.log("IP DSK:", casparDSK.quinaIp());
console.log("IP PLATO:", casparPlato.quinaIp());
