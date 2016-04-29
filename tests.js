requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    text: 'bower_components/text/text',
    json: 'bower_components/requirejs-plugins/src/json',
    ajv: 'bower_components/ajv/lib/ajv',
    mocha: 'bower_components/mocha/mocha',
    chai: 'bower_components/chai/chai',
    compile: 'bower_components/ajv/dist/',
    tv4: 'bower_components/tv4/tv4',
    minifyjson: 'bower_components/JSON.minify/minify.json',
    react: 'bower_components/react/react-with-addons',
    jsx: 'bower_components/jsx-requirejs-plugin/js/jsx',
    JSXTransformer: 'bower_components/jsx-requirejs-plugin/js/JSXTransformer'
  },
  jsx: {
    fileExtension: '.jsx'
  }
});
define(function(require) {
  require('mocha');
  require('minifyjson');
  var chai = require('chai');
  var expect = chai.expect;
  var tv4 = require('tv4');
  var rational = require('src/rational');
  var renderer = require('jsx!src/ScoreRenderer');

  mocha.setup('bdd');
  describe("OdeToJoy", function() {
    var odeText = require("text!examples/OdeToJoy.json");
    var ode = JSON.parse(JSON.minify(odeText));
    it("should validate with tv4", function() {
      var schema = require("json!JSMusScoreSchema.json"); //must be loaded as text because regex makes bad keys
      var valid = tv4.validate(ode, schema);
      expect(valid, JSON.stringify(tv4.error)).to.be.true;
    });
    it("should render", function() {
      var container = document.getElementById('testdisplay');
      renderer.render(container, ode);
      expect(true);
    });
  });
  mocha.run();
});