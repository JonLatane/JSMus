debugger
requirejs.config({
  paths: {
    text: 'bower_components/text/text',
    json: 'bower_components/requirejs-plugins/src/json',
    ajv: 'bower_components/ajv/lib/ajv',
    mocha: 'bower_components/mocha/mocha',
    chai: 'bower_components/chai/chai',
    jquery: 'bower_components/jquery/dist/jquery',
  }
});
define(function(require) {
  debugger
  var Ajv = require('ajv');
  var chai = require('chai');
  var mocha = require('mocha');
  var expect = chai.expect;
  mocha.setup('bdd');

  describe("OdeToJoy", function() {
    it("should validate with ajv", function() {
      var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}
      var schema = require("json!JSMusScoreSchema.json");
      var ode = require("json!examples/OdeToJoy.json");

      var validate = ajv.compile(schema);
      var valid = validate(ode);
      expect(valid);
      if (!valid) console.log(validate.errors)
    });
  });
  mocha.run();
});