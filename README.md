A fluent JavaScript interface for front end scroll effects.

```
(function() {

  // opening
  between(0).and(500).change('height').on('header').from('50%').to('5%').then().between(1000).and(1500).go().from('5%').to('50%');
  between(0).and(500).change('height').on('footer').from('50%').to('5%').then().between(1000).and(1500).go().from('5%').to('50%');

  // scroll indicator
  between(50).and(100).change('opacity').on('#indicator').from('1.0').to('0.0');
  between(0).and(100).change('margin-top').on('#indicator').from('32px').to('300px');

  // future ideas
  // between(100).and(200).fix('top').on('EL ID')
  // between(100).and(200).do(function (whatever) {})
}).call(this);
```