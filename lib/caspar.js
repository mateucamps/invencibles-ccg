var CasparCG = require('caspar-cg');
var ccg;
var ip = "";

function fieldsValuesToObject(fields, values) {
    var ret = {};
    var arrFields = fields.split(';');
    var arrValues = values.split(';');

    for(var i = 0; i < arrFields.length; i++)
        ret[arrFields[i]] = arrValues[i];

    console.log(ret);

    return ret;
}

exports.ccgInit = function(hostname) {
    ccg = new CasparCG(hostname, 5250);
    ip = hostname;
    console.log("Connectant CCG @ ", hostname);
    ccg.connect(function () {
        ccg.info(function (err, serverInfo) {
            // if (err) throw err;
            console.log('[caspar-cg Log]: ' + serverInfo);
        });
    });
};

exports.quinaIp = function() {
   console.log("Quina Ip? ", ip);
}

exports.templateIn = function(templName, fields, values) {
   ccg.loadTemplate("1-2", templName, true, fieldsValuesToObject(fields, values), function() {
       ccg.playTemplate("1-2");
   });
};

exports.templateUpdate = function(fields, values) {
    ccg.updateTemplateData("1-2", fieldsValuesToObject(fields, values));
}

exports.templateMethod = function(metode) {
    ccg.callTemplateMethod("1-2", metode);
};

exports.templateOut = function() {
    ccg.stopTemplate("1-2");
};

exports.mediaIn = function(mediaName) {
    ccg.play("1-1", mediaName);
};

exports.mediaOut = function() {
    ccg.stop("1-1");
};

exports.clearAll = function() {
    ccg.clear("1")
};
