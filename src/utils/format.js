export const formatDate = (timestamps = Date.now(), format = 'yyyy-MM-dd') => {
  const date = new Date(timestamps)
  const obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  if (/y+/.test(format)) {
    const $1 = /y+/.exec(format).toString()
    format = format.replace($1, (date.getFullYear() + '').substr(4 - $1.length))
  }

  for (const key in obj) {
    const reg = new RegExp(key)

    if (reg.test(format)) {
      const $1 = reg.exec(format).toString()
      format = format.replace(
        $1,
        $1.length === 1 ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length)
      )
    }
  }
  return format
}
