export default (func, wait = 0, option) => {
  let timeout, result, _this, _arguments
  let previous = 0
  const options = { leading: true, trailing: true, ...option }

  const later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(_this, _arguments)
    timeout || (_this = _arguments = null)
  }

  const throttled = function() {
    const now = new Date().getTime()

    if (!previous && options.leading === false) previous = now

    const remaining = wait - (now - previous)
    _this = this
    _arguments = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      result = func.apply(_this, _arguments)
      timeout || (_this = _arguments = null)
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}
