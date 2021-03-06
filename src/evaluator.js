const metadata = require('./metadata')
const expressionValidator = require('./validator')
const operators = metadata.operators
const operations = metadata.operations
const precedenceOperator = metadata.precedenceOperator

const buildTokens = stream => {
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

const tokenizer = data => {
  const stream = data.toString().replace(/\s+/g, '')
  return buildTokens(stream)
}

const reorderOperandPriorityInStack = (currentToken, OperatorStack, OutputQueue) => {
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

const makePostfixExpression = TokenQueue => {
  const OutputQueue = []
  const OperatorStack = []
  while (TokenQueue.length > 0) {
    const currentToken = TokenQueue.shift()
    const isOperator = operators.includes(currentToken)
    if (!isOperator) {
      OutputQueue.push(currentToken)
      continue
    }
    if (isOperator && OperatorStack.) {
      OperatorStack.push(currentToken)
      continue
    }
    if (isOperator) {
      reorderOperandPriorityInStack(currentToken, OperatorStack, OutputQueue)
      continue
    }
  }
  OutputQueue.push(...OperatorStack.reverse())
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
