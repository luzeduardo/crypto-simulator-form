const operators = ['*', '/', '+', '-']

const precedenceOperator = {
  '+': 1,
  '-': 1,
  '/': 2,
  '*': 2
}

const operations = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  '/': (a, b) => Number(a) / Number(b),
  '*': (a, b) => Number(a) * Number(b)
}

const metadata = {
  operators,
  operations,
  precedenceOperator
}
module.exports = metadata
