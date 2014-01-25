(function() {
  window.addEventListener('scroll', function(e) {
    var c, y, _i, _len, _ref, _results;
    y = window.pageYOffset;
    _ref = this.changes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _results.push(c.applyIt(y));
    }
    return _results;
  }, false);

  this.changes = [];

  this.between = function(start) {
    var c;
    c = new Changer(start);
    this.changes.push(c);
    return c;
  };

  this.Tween = (function() {
    function Tween() {}

    Tween.prototype.toPercent = function(position) {
      return (position - this.start) / (this.end - this.start);
    };

    Tween.prototype.calculate = function(position) {
      return (((this.to.value - this.from.value) * this.toPercent(position)) + this.from.value) + this.to.unit;
    };

    return Tween;

  })();

  this.Changer = (function() {
    function Changer(start) {
      this.currentTween = new Tween;
      this.currentTween.start = start;
      this.tweens = [this.currentTween];
      this;
    }

    Changer.prototype.and = function(end) {
      this.currentTween.end = end;
      return this;
    };

    Changer.prototype.change = function(property) {
      this.property = property;
      return this;
    };

    Changer.prototype.on = function(elSelector) {
      this.el = document.querySelector(elSelector);
      return this;
    };

    Changer.prototype.from = function(fromRaw) {
      this.currentTween.from = this.parseProperty(fromRaw);
      return this;
    };

    Changer.prototype.to = function(toRaw) {
      this.currentTween.to = this.parseProperty(toRaw);
      return this;
    };

    Changer.prototype.then = function() {
      this.currentTween = new Tween;
      this.tweens.push(this.currentTween);
      return this;
    };

    Changer.prototype.go = function() {
      return this;
    };

    Changer.prototype.between = function(start) {
      this.currentTween.start = start;
      return this;
    };

    Changer.prototype.parseProperty = function(property) {
      var match;
      if (property.match(/[\d\.]+[\w\%]+/)) {
        match = /([\d\.]+)([\w\%]+)/.exec(property);
        return {
          value: parseFloat(match[1]),
          unit: match[2],
          raw: property
        };
      }
    };

    Changer.prototype.applyIt = function(position) {
      var css, first, last, tween, _i, _len, _ref;
      css = this.parseCssText(this.el.style.cssText);
      first = this.tweens[0];
      last = this.tweens[this.tweens.length - 1];
      if (position < first.start) {
        css[this.property] = first.from.raw;
      } else if (position > last.end) {
        css[this.property] = last.to.raw;
      } else {
        _ref = this.tweens;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tween = _ref[_i];
          if (position >= tween.start && position <= tween.end) {
            css[this.property] = tween.calculate(position);
            break;
          }
        }
      }
      return this.el.style.cssText = this.toCssText(css);
    };

    Changer.prototype.parseCssText = function(css) {
      var parsed, parsedProperty, properties, property, _i, _len;
      properties = css.split(/\s*;\s*/);
      parsed = {};
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        property = properties[_i];
        parsedProperty = this.parseCssProperty(property);
        parsed[parsedProperty[0]] = parsedProperty[1];
      }
      return parsed;
    };

    Changer.prototype.parseCssProperty = function(css) {
      var trimmed;
      trimmed = css.replace(/^\s*|\s*$/g, '');
      return trimmed.split(/\s*:\s*/);
    };

    Changer.prototype.toCssText = function(css) {
      var cssText, key, value;
      cssText = '';
      for (key in css) {
        value = css[key];
        cssText = cssText + ("" + key + ":" + value + ";");
      }
      return cssText;
    };

    return Changer;

  })();

}).call(this);
