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

// it is assumed that this is the character array form of the expression input 
// by the user
let expression = ['144', '-', '42', '/', '7', '*', '24', '+', '6'];

// operator index arrays initialized to empty arrays 
let div = [], cross = [], plus = [], minus = [];

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

// operator indices are collected in a single array
let concatenationArray = div.concat(cross, plus, minus);
// operator indices are sorted in an ascending order
concatenationArray.sort(function(a, b) {
    return a - b;
});

// this function is designed to evaluate the expression entered by the user 
// according to the precedence rules
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
            if (concatIndex === 0) {
                firstOperand = expression.slice(0, opIndex);
                if (concatArrLength === 1) {
                    secondOperand = expression.slice((opIndex+1), expressionLength);
                    result = getResult(operator, firstOperand, secondOperand);
                    expression.splice(0, expressionLength, result);
                    concatenationArray.splice(concatIndex, 1);
                }
                else {
                    nextOpIndex = concatenationArray[1];
                    secondOperand = expression.slice((opIndex+1), nextOpIndex);
                    result = getResult(operator, firstOperand, secondOperand);
                    expression.splice(0, nextOpIndex, result);
                    concatenationArray.splice(concatIndex, 1);
                    opIndexArrays.forEach((element) => {
                        element.forEach((element, index, array) => {
                            array[index] = element - 2;
                        })
                    });
                    concatenationArray.forEach((element, index, array) => {
                        array[index] = element - 2;
                    });
                    concatenationArray.sort(function(a, b) {
                        return a - b;
                    });
                }
            }
            else if (concatIndex === (concatArrLength - 1)) {
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
        opIndexArrays.splice(0, 1);
    }
    return expression[0];
}

let calc_result = reduceExpression(div, cross, minus, plus);

console.log("The result of the calculation is " + calc_result);
