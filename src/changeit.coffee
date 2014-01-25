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


class @Tween
  toPercent: (position) -> (position - @start) / (@end - @start)
  calculate: (position) -> (((@to.value - @from.value) * @toPercent(position)) + @from.value) + @to.unit

class @Changer
  constructor: (start) -> 
    @currentTween = new Tween
    @currentTween.start = start
    @tweens = [@currentTween]
    this
  and: (end) -> 
    @currentTween.end = end
    this
  change: (@property) -> this
  on: (elSelector) ->
    @el = document.querySelector elSelector
    this
  from: (fromRaw) -> 
    @currentTween.from = @parseProperty fromRaw
    this
  to: (toRaw) ->
    @currentTween.to = @parseProperty toRaw
    this
  then: -> 
    # add a new tween
    @currentTween = new Tween
    @tweens.push @currentTween
    this
  go: -> 
    # does nothing, just for fluency
    this
  between: (start) ->
    @currentTween.start = start
    this
    
  parseProperty: (property) ->
    if property.match /[\d\.]+[\w\%]+/
      match = /([\d\.]+)([\w\%]+)/.exec property
      {value: parseFloat(match[1]), unit: match[2], raw: property}

  applyIt: (position) -> 

    css = @parseCssText @el.style.cssText

    # assume ordered by position, for now
    first = @tweens[0]
    last = @tweens[@tweens.length - 1]

    if position < first.start
      # apply the first 'from' property
      css[@property] = first.from.raw
    else if position > last.end
      # apply the last 'to' property
      css[@property] = last.to.raw
    else
      # in the tween zone, apply them
      for tween in @tweens
        if position >= tween.start and position <= tween.end
          # between, apply tween
          css[@property] = tween.calculate position  
          # if it applied, none of the others should, so break
          break
    
    @el.style.cssText = @toCssText css

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
  