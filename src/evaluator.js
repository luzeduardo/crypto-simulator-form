const metadata = require('./metadata')
const expressionValidator = require('./validator')
const operators = metadata.operators
const operations = metadata.operations
const precedenceOperator = metadata.precedenceOperator

const tokenizer = data => {
  const stream = data.toString().replace(/\s+/g, '')
  const TokenQueue = []
  for (let control = 0; control < stream.length;) {
    if (operators.includes(stream[control])) {
      TokenQueue.push(stream[control])
      control++
    } else {
      let bufferNumber = ''
      while (!operators.includes(stream[control]) && control < stream.length) {
        bufferNumber = bufferNumber + stream[control]
        control++
      }
      TokenQueue.push(bufferNumber)
    }
  }
  return TokenQueue
}

const makePostfixExpression = TokenQueue => {
  const OutputQueue = []
  const OperatorStack = []
  while (TokenQueue.length > 0) {
    const currentToken = TokenQueue.shift()
    if (currentToken && !operators.includes(currentToken)) {
      OutputQueue.push(currentToken)
    } else {
      if (OperatorStack.length === 0) {
        OperatorStack.push(currentToken)
      } else {
        if (precedenceOperator[currentToken] <= precedenceOperator[OperatorStack[OperatorStack.length - 1]]) {
          OutputQueue.push(OperatorStack.pop())
          while (OperatorStack.length > 0 && precedenceOperator[currentToken] <= precedenceOperator[OperatorStack[OperatorStack.length - 1]]) {
            OutputQueue.push(OperatorStack.pop())
          }
          OperatorStack.push(currentToken)
        } else {
          OperatorStack.push(currentToken)
        }
      }
    }
  }
  while (OperatorStack.length > 0) {
    OutputQueue.push(OperatorStack.pop())
  }
  return OutputQueue
}

const processRPN = RPNTokenList => {
  const processedRPN = []
  while (RPNTokenList.length > 0) {
    const currentToken = RPNTokenList.shift()
    if (!operators.includes(currentToken)) {
      processedRPN.push(currentToken)
    } else {
      const right = processedRPN.pop()
      const left = processedRPN.pop()
      const processedExpression = operations[currentToken](left, right)
      processedRPN.push(processedExpression)
    }
  }
  return processedRPN.pop()
}

const evaluator = (payload) => {
  expressionValidator(payload)
  const tokens = tokenizer(String(payload))
  const reversedRPN = makePostfixExpression(tokens)
  return String(processRPN(reversedRPN))
}
module.exports = evaluator
