(function() {
  var between;

  between = function(start) {
    return new Changer(start);
  };

  test('parsing properties', function() {
    var c, p;
    c = new Changer(100);
    p = c.parseProperty('100px');
    deepEqual(100, p.value);
    deepEqual('px', p.unit);
    p = c.parseProperty('44.4%');
    deepEqual(44.4, p.value);
    return deepEqual('%', p.unit);
  });

  test('calculate value at position', function() {
    var c, c2;
    c = between(100).and(200).from('100px').to('200px');
    deepEqual('150px', c.calculate(150));
    deepEqual('175px', c.calculate(175));
    c2 = between(100).and(200).from("50%").to("100%");
    deepEqual('75%', c2.calculate(150));
    deepEqual('50%', c2.calculate(100));
    return deepEqual('100%', c2.calculate(200));
  });

  test('calculate percent', function() {
    var c;
    c = new Changer(100).and(200);
    deepEqual(0.5, c.toPercent(150));
    deepEqual(0.25, c.toPercent(125));
    return deepEqual(1.0, c.toPercent(200));
  });

  test('parse css text', function() {
    var c, p;
    c = new Changer(1);
    p = c.parseCssText('height:300px;width:100%  ;  margin: 0 auto 15 auto;');
    deepEqual('300px', p['height']);
    deepEqual('100%', p['width']);
    return deepEqual('0 auto 15 auto', p['margin']);
  });

  test('parse css property', function() {
    var c, p;
    c = new Changer(1);
    p = c.parseCssProperty('height:100px');
    deepEqual('height', p[0]);
    deepEqual('100px', p[1]);
    p = c.parseCssProperty('height  :100px');
    deepEqual('height', p[0]);
    deepEqual('100px', p[1]);
    p = c.parseCssProperty('height:  100px');
    deepEqual('height', p[0]);
    deepEqual('100px', p[1]);
    p = c.parseCssProperty('height  :  100px');
    deepEqual('height', p[0]);
    deepEqual('100px', p[1]);
    p = c.parseCssProperty('   height  :  100px   ');
    deepEqual('height', p[0]);
    return deepEqual('100px', p[1]);
  });

  test('to css text', function() {
    var c, css, cssText;
    css = {
      'height': '100px',
      'width': '100%',
      'margin': '0 auto 15 auto'
    };
    c = new Changer(1);
    cssText = c.toCssText(css);
    return deepEqual('height:100px;width:100%;margin:0 auto 15 auto;', cssText);
  });

}).call(this);
