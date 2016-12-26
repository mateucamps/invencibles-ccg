var Web = require('./lib/web');
var config = require('./config.json');
var casparPlato = require('./lib/caspar');
var casparDSK = require('./lib/caspar');

casparPlato.ccgInit(config.ips.ipCasparPlato);
casparDSK.ccgInit(config.ips.ipCasparDSK);

exports.casparPlato = casparPlato;
exports.casparDSK = casparDSK;
