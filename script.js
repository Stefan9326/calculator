// Issues:
// - Show error message when product of an operation is too long.
// - Fix equals button functionality so that it only performs an operation when there are two operands and an operator.
// - Add decimal point functionality.
// - Add backspace functionality.
// - Add squaring functionality.
// - Show error message when user tries to add a decimal point to a number that already has one.
// - Round long decimal numbers so they don't overflow the display.
// - Keep firstOperand on display when user clicks on an operator button until they click on a number button.
// - Allow user to chain operations. For example, 5 + 5 + 5 should equal 15. When the user clicks on the second operator button, the first operation
//   should be performed and the result should be displayed and used as the first operand for the second operation.
// - Change the color of the operator buttons to a different color than the number buttons.
// - Change the color of the operator buttons on hover.
// - Add animation when buttons are clicked.
// - Improve overall styling of the whole webpage (background, font, etc.)
// - Add keyboard support?




let currentDisplay = document.querySelector('#calculator-display');
let currentOperator = null;
let firstOperand = null;
let secondOperand = null;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clearButton');

numberButtons.forEach(button => button.addEventListener('click', () => {
  if (currentDisplay.textContent.length < 21) {
    currentDisplay.textContent += button.textContent;
  }
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
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

clearButton.addEventListener('click', () => {
  currentDisplay.textContent = '';
  currentOperator = null;
  firstOperand = null;
  secondOperand = null;
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


