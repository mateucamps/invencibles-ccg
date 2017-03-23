// CASPAR.js (PDT)
var CasparCG = require('caspar-cg');

function Caspar(ip) {
  this.servidor = new CasparCG(ip, 5250);
  self = this;
  this.servidor.connect(function () {
    self.servidor.info(function (err, serverInfo) {
      console.log("[CasparCG Log]", serverInfo);
    });
  });
}

Caspar.prototype.videoTest = function () {
  this.servidor.play("1-1", "AMB");
}

Caspar.prototype.templateTest = function () {
  this.servidor.loadTemplate("1-2", "blau_transp", true, {'f0':'hola','f1':'adeu'});
}

Caspar.prototype.templateIn = function(tempName, data, layer) {
  if(!layer) {
    this.servidor.loadTemplate("1-2", tempName, true, data);
  } else {
    this.servidor.loadTemplate(layer, tempName, true, data);
  }
}

Caspar.prototype.templateOut = function(layer) {
  if(!layer) {
    this.servidor.stopTemplate("1-2");
  } else {
    this.servidor.stopTemplate(layer);
  }
}

Caspar.prototype.templateUpdate = function(data) {
  this.servidor.updateTemplateData("1-2", data);
}

Caspar.prototype.templateMethod = function(metode) {
  this.servidor.callTemplateMethod("1-2", metode);
}

Caspar.prototype.mediaIn = function(media) {
  this.servidor.play("1-1", media);
}

Caspar.prototype.mediaOut = function() {
  this.servidor.stop("1-1");
}

Caspar.prototype.clearAll = function() {
  this.servidor.clear("1");
}

module.exports = Caspar;
