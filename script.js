let currentDisplay = document.querySelector('#calculator-display');
let currentOperator = null;
let firstOperand = null;
let secondOperand = null;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clearButton');

numberButtons.forEach(button => button.addEventListener('click', () => {
  currentDisplay.textContent += button.textContent;
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
  firstOperand = currentDisplay.textContent;
  currentDisplay.textContent = '';
  switch (button.textContent) {
    case '+':
      currentOperator = add;
      break;
    case '-':
      currentOperator = subtract;
      break;
    case '*':
      currentOperator = multiply;
      break;
    case '/':
      currentOperator = divide;
      break;
  }
}));

clearButton.addEventListener('click', () => {
  currentDisplay.textContent = '';
});

equalsButton.addEventListener('click', () => {
  secondOperand = currentDisplay.textContent;
  currentDisplay.textContent = operate(currentOperator, +firstOperand, +secondOperand);
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
    return (a / b).toString();
}

function operate(operator, a, b) {
    return operator(a, b);
}


