(function() {

  // opening
  between(0).and(500).change('height').on('header').from('50%').to('5%')
  between(0).and(500).change('height').on('footer').from('50%').to('5%')

  // header
  // between(0).and(500).change('margin-top').on('hgroup').from('30%').to('0%')

  // scroll indicator
  between(50).and(100).change('opacity').on('#indicator').from('1.0').to('0.0')
  between(0).and(100).change('margin-top').on('#indicator').from('32px').to('128px')
  
  // closing
  //between(1000).and(1500).change('height').on('header').from('5%').to('50%')
  //between(1000).and(1500).change('height').on('footer').from('5%').to('50%')

  // future ideas
  // between(100).and(200).fix('top').on('EL ID')
  // between(100).and(200).do(function (whatever) {})
}).call(this);