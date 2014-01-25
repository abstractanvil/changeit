(function() {
  between(0).and(500).change('height').on('header').from('50%').to('5%')
  between(0).and(500).change('height').on('footer').from('50%').to('5%')

  between(200).and(300).change('opacity').on('section').from('0.0').to('1.0')
  // between(400).and(500).change('opacity').on('#bottom-title').from('1.0').to('0.0')

  between(1000).and(1500).change('height').on('header').from('5%').to('50%')
  between(1000).and(1500).change('height').on('footer').from('5%').to('50%')

  // future ideas
  // between(100).and(200).fix('top').on('EL ID')
  // between(100).and(200).do(function (whatever) {})
}).call(this);