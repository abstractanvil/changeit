window.addEventListener 'scroll', (e)->
  y = window.pageYOffset
  c.applyIt(y) for c in @changes
, false

@changes = []
@between = (start) -> 
  # add to array
  c = new Changer start
  @changes.push c
  c

class @Changer
  constructor: (@start) -> this
  and: (@end) -> this
  change: (@property) -> this
  on: (@elSelector) ->
    @el = document.querySelector elSelector
    this
  from: (@fromRaw) -> 
    @from = @parseProperty @fromRaw
    this
  to: (@toRaw) ->
    @to = @parseProperty @toRaw
    this
    
  parseProperty: (property) ->
    if property.match /[\d\.]+[\w\%]+/
      match = /([\d\.]+)([\w\%]+)/.exec property
      {value: parseFloat(match[1]), unit: match[2]}

  applyIt: (position) -> 

    css = @parseCssText @el.style.cssText

    if position >= @start and position <= @end
      # between, apply tween
      css[@property] = @calculate position  
    else if position < @start
      # before, apply 'from'
      css[@property] = @fromRaw
    else if position > @end
      # after, apply 'to'
      css[@property] = @toRaw

    @el.style.cssText = @toCssText css

  toPercent: (position) -> (position - @start) / (@end - @start)

  calculate: (position) -> (((@to.value - @from.value) * @toPercent(position)) + @from.value) + @to.unit

  parseCssText: (css) ->
    properties = css.split /\s*;\s*/
    parsed = {}
    for property in properties
      parsedProperty = @parseCssProperty property
      parsed[parsedProperty[0]] = parsedProperty[1]
    parsed

  parseCssProperty: (css) ->
    trimmed = css.replace /^\s*|\s*$/g, ''
    trimmed.split /\s*:\s*/

  toCssText: (css) ->
    cssText = ''
    cssText = cssText + "#{key}:#{value};" for key, value of css
    cssText
  