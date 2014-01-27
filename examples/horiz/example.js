(function() {

  // scroll indicator
  between(10).and(60).change('opacity').on('#indicator').from('1.0').to('0.0');
  between(0).and(100).change('margin-top').on('#indicator').from('0px').to('300px');

  // opening
  between(0).and(500).change('height').on('header').from('50%').to('5%').then().between(1000).and(1500).go().from('5%').to('50%');
  between(0).and(500).change('height').on('footer').from('50%').to('5%').then().between(1000).and(1500).go().from('5%').to('50%');

  // github link
  between(1600).and(1700).change('opacity').on('#github-link').from('0.0').to('1.0');

}).call(this);