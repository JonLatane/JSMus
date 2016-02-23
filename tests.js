requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    text: 'bower_components/text/text',
    json: 'bower_components/requirejs-plugins/src/json',
    ajv: 'bower_components/ajv/lib/ajv',
    mocha: 'bower_components/mocha/mocha',
    chai: 'bower_components/chai/chai',
    jquery: 'bower_components/jquery/dist/jquery',
    compile: 'bower_components/ajv/dist/',
    tv4: 'bower_components/tv4/tv4'
  }
});
define(function(require) {
  //var Ajv = require('ajv');
  require('mocha');
  require('lib/minify.json')
  var chai = require('chai');
  var expect = chai.expect;
  var tv4 = require('tv4');
  mocha.setup('bdd');

  describe("OdeToJoy", function() {
    var odeText = require("text!examples/OdeToJoy.json");
    var ode = JSON.parse(JSON.minify(odeText));
    it("should validate with tv4", function() {
      var schema = require("json!JSMusScoreSchema.json"); //must be loaded as text because regex makes bad keys
      var valid = tv4.validate(ode, schema);
      expect(valid).to.be.true;
      if(!valid) {
        console.log(tv4.error);
      }
    });
  });
  mocha.run();
});