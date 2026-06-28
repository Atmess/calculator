const display = document.getElementById('display');
const clearbtn =document.querySelector('#clear');

let A=null;
let entry='0';
let pendingOp = null;

 function updatedisplay(val=entry){
display.textContent= val ;
 }

function calculate(num1, num2 ,action) {
    switch (action){
        case '+' : return num1 + num2 ;
        case '-' : return num1 - num2 ;
        case '*' : return num1 * num2 ;
        case '/' : return num2 !== 0 ?  num1 / num2 :NaN;
        default : num2 = NaN; 
    }
updatedisplay();
}

function handleOperator(nextOp) {
    const inputNum = parseFloat(entry);

    // If A is empty, save the current typed number as A
    if (A === null) {
        A = inputNum;
    } 
    // If an operation was already waiting, calculate it first
    else if (pendingOp) {
        A = calculate(A, inputNum, pendingOp);
        updatedisplay(A);
    }

    pendingOp = nextOp;
    entry = '0'; // Reset typing buffer for the second number
}

function handlenumber(num) {
    if (num === '.' && entry.includes('.')) return;

    if (entry === '0' && num === '.') {
        entry = '0.';
    } else if (entry === '0') {
        entry = num;
    } else {
        entry += num;
    }
    updatedisplay(entry);
}

function handleOp(action) {
    if (action === 'clear') {
        A = null;
        entry = '0';
        pendingOp = null;
        updatedisplay();
    } 
    else if (action === 'neg') {
        // Toggle negative sign on whatever is currently displayed
        if (entry !== '0' && entry !== '') {
            entry = (parseFloat(entry) * -1).toString();
            updatedisplay(entry);
        } else if (A !== null) {
            A = A * -1;
            updatedisplay(A);
        }
    } 
    else if (action === '=') {
        if (pendingOp && entry !== '') {
            const result = calculate(A, parseFloat(entry), pendingOp);
            updatedisplay(result);
            A = result; // Save result so user can keep doing math on it
            entry = '0';
            pendingOp = null;
        }
    }
}
        

document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click',()=>handlenumber(btn.dataset.number));
})

document.querySelectorAll('.op').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === '=') {
            handleOp('=');
        } else {
            handleOperator(action);
        }
    });
});

document.querySelectorAll('.func').forEach(btn => {
    btn.addEventListener('click', () => handleOp(btn.dataset.action));
});