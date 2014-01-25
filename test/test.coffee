
# helper
between = (start) ->
  new Changer start

test 'parsing properties', ->
  c = new Changer 100
  p = c.parseProperty '100px'
  deepEqual 100, p.value
  deepEqual 'px', p.unit

  p = c.parseProperty '44.4%'
  deepEqual 44.4, p.value
  deepEqual '%', p.unit

test 'calculate value at position', ->
  c = between(100).and(200).from('100px').to('200px')
  deepEqual '150px', c.calculate(150)
  deepEqual '175px', c.calculate(175)

  c2 = between(100).and(200).from("50%").to("100%")
  deepEqual '75%', c2.calculate(150)
  deepEqual '50%', c2.calculate(100)
  deepEqual '100%', c2.calculate(200)

test 'calculate percent', ->
  c = new Changer(100).and(200)
  deepEqual 0.5, c.toPercent(150)
  deepEqual 0.25, c.toPercent(125)
  deepEqual 1.0, c.toPercent(200)

test 'parse css text', ->
  c = new Changer(1)
  p = c.parseCssText 'height:300px;width:100%  ;  margin: 0 auto 15 auto;'
  deepEqual '300px', p['height']
  deepEqual '100%', p['width']
  deepEqual '0 auto 15 auto', p['margin']

test 'parse css property', ->
  c = new Changer 1
  p = c.parseCssProperty 'height:100px'
  deepEqual 'height', p[0]
  deepEqual '100px', p[1]

  p = c.parseCssProperty 'height  :100px'
  deepEqual 'height', p[0]
  deepEqual '100px', p[1]

  p = c.parseCssProperty 'height:  100px'
  deepEqual 'height', p[0]
  deepEqual '100px', p[1]

  p = c.parseCssProperty 'height  :  100px'
  deepEqual 'height', p[0]
  deepEqual '100px', p[1]

  p = c.parseCssProperty  '   height  :  100px   '
  deepEqual 'height', p[0]
  deepEqual '100px', p[1]

test 'to css text', ->
  css = 
    'height': '100px',
    'width': '100%',
    'margin': '0 auto 15 auto'

  c = new Changer 1

  cssText = c.toCssText css
  deepEqual 'height:100px;width:100%;margin:0 auto 15 auto;', cssText