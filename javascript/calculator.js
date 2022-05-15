// definition of the objects for all of the buttons of the calculator
const division = document.querySelector("#division");
const multiplication = document.querySelector("#multiplication");
const subtraction = document.querySelector("#subtraction");
const addition = document.querySelector("#addition");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const dot = document.querySelector("#dot");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
// definition of the object for the screen of the calculator
const display = document.querySelector(".screen");

// division, multiplication, summation and subtraction operations are defined
let getResult = function(operator, firstOperand, secondOperand) {
    if (operator === '/') {
        return (+firstOperand) / (+secondOperand);
    }
    else if (operator === '*') {
        return (+firstOperand) * (+secondOperand);
    }
    else if (operator === '+') {
        return (+firstOperand) + (+secondOperand);
    }
    else {
        return (+firstOperand) - (+secondOperand);
    }
}

// this function is designed to evaluate the expression entered by the user 
// according to the precedence rules. the arguments are ordered according to the
// precedence the operations are to be performed.
// reduceExpression(div, cross, minus, plus) evaluates an expression according
// to the correct precedence.
let reduceExpression = function(...opIndexArrays) {
    let opIndex, concatIndex, concatArrLength, firstOperand, secondOperand;
    let previousOpIndex, nextOpIndex;
    let result, operator;
    let expressionLength;
    // take all of the operations into consideration
    while (opIndexArrays.length) {
        console.log(expression);
        // take all incidences of the current operation into consideration
        while (opIndexArrays[0].length) {
            // opIndex is the index of the operation in the expression array
            opIndex = (opIndexArrays[0])[0];
            // drop this incidence of the operation from the operation array
            opIndexArrays[0].splice(0, 1);
            // identify the operator
            operator = expression[opIndex];
            // locate the opIndex in the concatenation array
            concatIndex = concatenationArray.findIndex((element) => 
            element === opIndex);
            concatArrLength = concatenationArray.length;
            expressionLength = expression.length;
            // the case when the operation is the first in the expression
            if (concatIndex === 0) {
                firstOperand = expression.slice(0, opIndex);
                // the case when there is only one operation
                if (concatArrLength === 1) {
                    secondOperand = expression.slice((opIndex+1), expressionLength);
                    result = getResult(operator, firstOperand, secondOperand);
                    // remove the operation and its operands from the expression
                    expression.splice(0, expressionLength, result);
                    // remove the operation from the operaitons array
                    concatenationArray.splice(concatIndex, 1);
                }
                // the case when there are more than one operations
                else {
                    // the index of the next operator
                    nextOpIndex = concatenationArray[1];
                    secondOperand = expression.slice((opIndex+1), nextOpIndex);
                    result = getResult(operator, firstOperand, secondOperand);
                    expression.splice(0, nextOpIndex, result);
                    concatenationArray.splice(concatIndex, 1);
                    // the indices of the operators are updated due to the
                    // removal of the current operator
                    opIndexArrays.forEach((element) => {
                        element.forEach((element, index, array) => {
                            array[index] = element - 2;
                        })
                    });
                    // update of the indices due to the removal of the current
                    // operator
                    concatenationArray.forEach((element, index, array) => {
                        array[index] = element - 2;
                    });
                    concatenationArray.sort(function(a, b) {
                        return a - b;
                    });
                }
            }
            // the case when the operation is the last in the expression
            else if (concatIndex === (concatArrLength - 1)) {
                // the index of the previous operator
                previousOpIndex = concatenationArray[concatIndex - 1];
                firstOperand = expression.slice(previousOpIndex + 1, opIndex);
                secondOperand = expression.slice(opIndex + 1, expressionLength);
                result = getResult(operator, firstOperand, secondOperand);
                expression.splice((previousOpIndex+1), 
                (expressionLength-(previousOpIndex+1)), result);
                concatenationArray.splice(concatIndex, 1);
                concatenationArray.sort(function(a, b) {
                    return a - b;
                });
            }
            // the case when the operation is neither the first nor the last in
            // the expression
            else {
                previousOpIndex = concatenationArray[concatIndex - 1];
                firstOperand = expression.slice(previousOpIndex + 1, opIndex);
                nextOpIndex = concatenationArray[concatIndex + 1];
                secondOperand = expression.slice((opIndex + 1), nextOpIndex);
                result = getResult(operator, firstOperand, secondOperand);
                expression.splice((previousOpIndex + 1), 
                (nextOpIndex - (previousOpIndex + 1)), result);
                concatenationArray.splice(concatIndex, 1);
                opIndexArrays.forEach((element) => {
                    element.forEach((element, index, array) => {
                        if (element >= nextOpIndex) {
                            array[index] = element - 2;
                        }
                    })
                });
                concatenationArray.forEach((element, index, array) => {
                    if (element >= nextOpIndex) {
                        array[index] = element - 2;
                    }
                });
                concatenationArray.sort(function(a, b) {
                    return a - b;
                });
                console.log(expression);
            }
        }
        // all of the incidences of the first operation have been taken into
        // consideration
        opIndexArrays.splice(0, 1);
    }
    // expression has only one element which is its result
    return expression[0];
}

let equalClicked = false;
let zeroClicked = false;
let nonZeroDigitClicked = false;

function dropOpEventListener() {
    division.removeEventListener("click", opButtonClicked);
    multiplication.removeEventListener("click", opButtonClicked);
    subtraction.removeEventListener("click", opButtonClicked);
    addition.removeEventListener("click", opButtonClicked);
}

function addOpEventListener() {
    division.addEventListener("click", opButtonClicked);
    multiplication.addEventListener("click", opButtonClicked);
    subtraction.addEventListener("click", opButtonClicked);
    addition.addEventListener("click", opButtonClicked);
}

function addDigitEventListener() {
    six.addEventListener("click", digitButtonClicked);
    seven.addEventListener("click", digitButtonClicked);
    eight.addEventListener("click", digitButtonClicked);
    nine.addEventListener("click", digitButtonClicked);
    two.addEventListener("click", digitButtonClicked);
    three.addEventListener("click", digitButtonClicked);
    four.addEventListener("click", digitButtonClicked);
    five.addEventListener("click", digitButtonClicked);
    zero.addEventListener("click", digitButtonClicked);
    one.addEventListener("click", digitButtonClicked);
}

function dropDigitEventListener() {
    six.removeEventListener("click", digitButtonClicked);
    seven.removeEventListener("click", digitButtonClicked);
    eight.removeEventListener("click", digitButtonClicked);
    nine.removeEventListener("click", digitButtonClicked);
    two.removeEventListener("click", digitButtonClicked);
    three.removeEventListener("click", digitButtonClicked);
    four.removeEventListener("click", digitButtonClicked);
    five.removeEventListener("click", digitButtonClicked);
    zero.removeEventListener("click", digitButtonClicked);
    one.removeEventListener("click", digitButtonClicked);            
}

function opButtonClicked() {
    let buttonText = this.textContent;
    display.textContent += buttonText;
    nonZeroDigitClicked = false;
    zeroClicked = false;
    dropOpEventListener();
    addDigitEventListener();
}

function digitButtonClicked() {
    let buttonText = this.textContent;
    display.textContent += buttonText;
    if (buttonText !== "0") {
        nonZeroDigitClicked = true;
    }
    else {
        zeroClicked = true;
        if (!nonZeroDigitClicked) {
            dropDigitEventListener();
        }
    }
    addOpEventListener();
}

addDigitEventListener();

// it is assumed that this is the character array form of the expression input 
// by the user
// let expression = ['144', '/', '3', '+', '7', '*', '4', '-', '6'];

// operator index arrays initialized to empty arrays 
let div = [], cross = [], plus = [], minus = [];

expression = [];

// the array indices of each operator are extracted from the expression array
expression.forEach((element, index) => {
    if (element === '/') {
        div.push(index);
    }
    else if (element === '*') {
        cross.push(index);
    }
    else if (element === '+') {
        plus.push(index);
    }
    else if (element === '-') {
        minus.push(index);
    }
})

// operator indices are collected in a single array
let concatenationArray = div.concat(cross, plus, minus);
// operator indices are sorted in an ascending order
concatenationArray.sort(function(a, b) {
    return a - b;
});

if ( equalClicked) {
    let calc_result = reduceExpression(div, cross, minus, plus);
}
