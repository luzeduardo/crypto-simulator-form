const handlerValidator = {
  set: function (obj, prop, value) {
    if (value.charAt(0) === '-') {
      throw new SyntaxError('Negative numbers not implemented yet.')
    }

    if (/[a-z]/gi.test(value)) {
      throw new SyntaxError('Not a valid input.')
    }

    if (/\(|\)/g.test(value)) {
      throw new SyntaxError('Parenthesization not implemented yet.')
    }
  }
}
const validator = data => {
  const proxyValidator = new Proxy({}, handlerValidator)
  proxyValidator.value = String(data)
}

module.exports = validator
