// Issues:
// - Add keyboard support?

let currentDisplay = document.querySelector('#calculator-display');
let currentOperator = null;
let firstOperator = null;
let secondOperator = null;
let firstOperand = null;
let secondOperand = null;
let operatorClicks = 0;
let numberClicks = 0;
let equalsClicks = 0;

const backspaceButton = document.querySelector('#backspace');
const clearButton = document.querySelector('#clearButton');
const numberButtons = document.querySelectorAll('.number');
const decimalButton = document.querySelector('#decimal');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');

backspaceButton.addEventListener('click', () => {
  if (currentDisplay.textContent) {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  }
})

clearButton.addEventListener('click', () => {
  currentDisplay.textContent = '';
  currentOperator = null;
  operatorClicks = 0;
  numberClicks = 0;
  firstOperand = null;
  secondOperand = null;
});

numberButtons.forEach(button => button.addEventListener('click', () => {
  if (numberClicks === 0) {
    currentDisplay.textContent = '';
  }
  if (currentDisplay.textContent.length < 21) {
      currentDisplay.textContent += button.textContent;
  }
  ++numberClicks;

}));

decimalButton.addEventListener('click', () => {
  if (!(currentDisplay.textContent.includes('.')) && currentDisplay.textContent.length > 0) {
    currentDisplay.textContent += '.';
  }
})

operatorButtons.forEach(button => button.addEventListener('click', () => {
  numberClicks = 0;
  ++operatorClicks;

    switch (button.id) {
      case 'add':
      currentOperator = add;
      break;
    case 'subtract':
      currentOperator = subtract;
      break;
    case 'multiply':
      currentOperator = multiply;
      break;
    case 'divide':
      currentOperator = divide;
      break;
    }

  if (operatorClicks === 1) {
    firstOperator = currentOperator;
    firstOperand = currentDisplay.textContent;
  }
  if (operatorClicks > 1) {
    secondOperator = currentOperator;
    secondOperand = currentDisplay.textContent;
    currentDisplay.textContent = operate(firstOperator, +firstOperand, +secondOperand);
    firstOperator = secondOperator;
  }
  firstOperand = currentDisplay.textContent;
  equalsClicks = 0;
}));

equalsButton.addEventListener('click', () => {
  operatorClicks = 0;
  if (equalsClicks === 0) {
    secondOperand = currentDisplay.textContent;
    currentDisplay.textContent = operate(currentOperator, +firstOperand, +secondOperand);
  }
  ++equalsClicks;
});

function add(a, b) {
  return (a + b).toString();
}

function subtract(a, b) {
  return (a - b).toString();
}

function multiply(a, b) {
  return (a * b).toString();
}

function divide(a, b) {
  if (b === 0) {
    return 'ERROR: Division by 0';
  }
  return (a / b).toString();
}

function operate(operator, a, b) {
  let result = operator(a, b);
  if (result.includes('e')) {
    if (Number(result.includes('.') && result.includes('-'))) {
      result = Number(result).toFixed(19).toString();
      return result
    }
    return 'ERROR: Result out of range';
  }
  return result;
}