var Web = require('./lib/web');
var config = require('./config.json');
var casparPlato = require('./lib/caspar');
var casparDSK = require('./lib/caspar');

console.log("ip caspar plato", config.ips.ipCasparPlato);
casparPlato.ccgInit(config.ips.ipCasparPlato);
exports.casparPlato = casparPlato;

console.log("ip caspar dsk", config.ips.ipCasparDSK);
casparDSK.ccgInit(config.ips.ipCasparDSK);
exports.casparDSK = casparDSK;
