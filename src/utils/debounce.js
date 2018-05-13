export default (func, wait = 0, immediate = false) => {
  let timeout, result

  const debounced = function() {
    const _this = this
    const _arguments = arguments

    timeout && clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      callNow && (result = func.apply(_this, _arguments))
    } else {
      timeout = setTimeout(function() {
        func.apply(_this, _arguments)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
