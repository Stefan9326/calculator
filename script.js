// Issues:
// - Add decimal point functionality.
// - Show error message when user tries to add a decimal point to a number that already has one.
// - Round long decimal numbers so they don't overflow the display.
// - Keep firstOperand on display when user clicks on an operator button until they click on a number button.
// - Allow user to chain operations. For example, 5 + 5 + 5 should equal 15. When the user clicks on the second operator button, the first operation
//   should be performed and the result should be displayed and used as the first operand for the second operation.
// - Add keyboard support?




let currentDisplay = document.querySelector('#calculator-display');
let currentOperator = null;
let firstOperand = null;
let secondOperand = null;
let equalsClicks = 0;

const backspaceButton = document.querySelector('#backspace');
const clearButton = document.querySelector('#clearButton');
const numberButtons = document.querySelectorAll('.number');
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
  firstOperand = null;
  secondOperand = null;
});

numberButtons.forEach(button => button.addEventListener('click', () => {
  if (currentDisplay.textContent.length < 21) {
    currentDisplay.textContent += button.textContent;
  }
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
  equalsClicks = 0;
  firstOperand = currentDisplay.textContent;
  currentDisplay.textContent = '';

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
}));

equalsButton.addEventListener('click', () => {
  ++equalsClicks;
  if (equalsClicks === 1) {
    secondOperand = currentDisplay.textContent;
    currentDisplay.textContent = operate(currentOperator, +firstOperand, +secondOperand);
  } else if (equalsClicks > 1) {
    firstOperand = currentDisplay.textContent;
    currentDisplay.textContent = operate(currentOperator, +firstOperand, +secondOperand);
  }
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
   if (operator(a, b).length > 21) {
     return 'ERROR: Result too long';
   }
  return operator(a, b);
}


