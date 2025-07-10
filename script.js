const previousOperandText = document.getElementById('previous-operand');
const currentOperandText = document.getElementById('current-operand');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') currentOperand = '';
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '' && previousOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    
    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '×':
            computation = prev * curr;
            break;
        case '÷':
            if (curr === 0) {
                currentOperand = 'Error';
                operation = undefined;
                previousOperand = '';
                shouldResetScreen = true;
                updateDisplay();
                return;
            }
            computation = prev / curr;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    currentOperandText.textContent = currentOperand || '0';
    if (operation != null && previousOperand !== '') {
        previousOperandText.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.textContent = '';
    }
}

// Button click event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.dataset.number);
        } else if (button.classList.contains('operator')) {
            switch (button.dataset.action) {
                case 'add':
                    chooseOperation('+');
                    break;
                case 'subtract':
                    chooseOperation('-');
                    break;
                case 'multiply':
                    chooseOperation('×');
                    break;
                case 'divide':
                    chooseOperation('÷');
                    break;
                case 'delete':
                    deleteNumber();
                    break;
            }
        } else if (button.classList.contains('equals')) {
            compute();
        } else if (button.classList.contains('clear')) {
            clear();
        }
    });
});

// Keyboard support
window.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
        chooseOperation(e.key);
    } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        chooseOperation('×');
    } else if (e.key === '/' || e.key === '÷') {
        chooseOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        compute();
    } else if (e.key === 'Backspace') {
        deleteNumber();
    } else if (e.key.toLowerCase() === 'c') {
        clear();
    }
});

// Initial display
updateDisplay(); 