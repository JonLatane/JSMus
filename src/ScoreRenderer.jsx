
(function(global, factory){
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['react'], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    // CommonJS. Define export.
    module.exports = factory();
  } else {
    // Browser globals
    global.rational = factory();
  }
})(this, function(React) {
  function Renderer() {};


  Renderer.prototype.render = function(container, data) {
    //React.createClass({});
  }

  return new Renderer();
});
