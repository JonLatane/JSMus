
(function(global, factory){
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    // CommonJS. Define export.
    module.exports = factory();
  } else {
    // Browser globals
    global.rational = factory();
  }
})(this, function() {
  var pattern = /^(-)?(\d+)(?:\D*)(\d+)?(?:\D*)(\d+)?$/; 
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  };
  function lcm(a, b) {
    return (a * b) / gcd(a, b);   
  }
  function Rational(value, skipReduce) {
    if(!(this instanceof Rational)) {
      return new Rational(value, skipReduce);
    }
    var c=0, //Rational of the form "c + n/d"
        n=0,
        d=1;
    var matcher;
    if(typeof(value) == 'object') {
      n = value.num;
      d = value.denom;
    } else if(typeof(value) == 'number' && Math.round(value) == value) {
      c = value;
    } else if(typeof(value) == 'string' && (matcher = pattern.exec(value)) != null) {
      if(matcher[4]) {
        c = Number(matcher[2]);
        n = Number(matcher[3]);
        d = Number(matcher[4]);
      } else if(matcher[2]) {
        n = Number(matcher[2]);
        d = Number(matcher[3]);
      } else {
        c = Number(matcher[2]);
      }
      if(matcher[1]) { //negative
        c = -c;
        n = -n;
      }
    } else {
      console.warn("Initializing implicit 0-valued rational");
    }

    this.num = n + (c * d);
    this.denom = d;
    if(!skipReduce) {
      this.reduce();
    }
  };

  Rational.prototype.reduce = function() {
    var $gcd = gcd(this.num, this.denom);
    this.num = this.num/$gcd;
    this.denom = this.denom/$gcd;
  };

  Rational.prototype.inverse = function() {
    var result = new Rational(this, true);
    result.num = this.denom;
    result.denom = this.num;
    return result;
  }

  Rational.prototype.plus = function(other) {
    other = new Rational(other, true);
    var result = new Rational(this, true);
    var $lcm = lcm(this.denom, other.denom);
    result.denom = $lcm;
    result.num = (this.num * $lcm / this.denom) + (other.num * $lcm / other.denom);
    result.reduce();
    return result;
  };

  Rational.prototype.minus = function(other) {
    other = new Rational(other, true);
    var result = new Rational(this, true);
    var lcm = lcm(this.denom, other.denom);
    result.denom = lcm;
    result.num = (this.num * lcm / this.denom) - (other.num * lcm / other.denom);
    result.reduce();
    return result;
  };

  Rational.prototype.times = function(other) {
    other = new Rational(other, true);
    var result = new Rational(this, true);
    result.num = this.num * other.num;
    result.denom = this.denom * other.denom;
    result.reduce();
    return result;
  };

  Rational.prototype.dividedBy = function(other) {
    other = new Rational(other, true);
    var result = new Rational(this, true);
    result.num = this.num * other.denom;
    result.denom = this.denom * other.num;
    result.reduce();
    return result;
  };

  return Rational;
});
