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

/*
1. initialize division array to an empty array
2. initialize product array to an empty array
3. initialize sum array to an empty array
4. initialize subtraction array to an empty array
5. store div indices in the division array
6. store cross indices in the product array
7. store plus indices in the sum array
8. store minus indices in the subtraction array
9. create another array which is the concatenation of these four arrays
10. sort the concatenation array
11. if the division array is not empty
11.1. while index is not equal to the size of the division_array
11.1.1. get the div index
11.1.2. locate it in the concatenation array
11.1.3. if it is the first in the concatenation array
11.1.3.1. first_operand = expression[0:(div_index)]
11.1.3.2. second_operand = expression[(div_index + 1):(next_operator_index)]
11.1.3.3. result = (+first_operand) / (+second_operand)
11.1.3.4. expression.splice(0,next_operator_index, result)
11.1.3.5. remove this index from the concatenation array
11.1.3.6. decrease each index of the division_array by next_operator_index
11.1.3.7. decrease each index of the product_array by next_operator_index
11.1.3.8. decrease each index of the sum_array by next_operator_index
11.1.3.9. decrease each index of the subtraction_array by next_operator_index
11.1.3.10. decrease each index of the concatenation_array by next_operator_index
11.1.4. else if it is the last in the concatenation array
11.1.4.1. first_operand = expression[(previous_operator_index+1):div_index]
11.1.4.2. second_operand = expression[(div_index+1):expression_length]
11.1.4.3. result = (+first_operand) / (+second_operand)
11.1.4.4. expression.splice((previous_operator_index+1),(expression_length-(previous_operator_index+1)), result)
11.1.4.5. remove this index from the concatenation array
11.1.5. else
11.1.5.1. first_operand = expression[(previous_operator_index+1):div_index]
11.1.5.2. second_operand = expression[(div_index + 1):(next_operator_index)]
11.1.5.3. result = (+first_operand) / (+second_operand)
11.1.5.4. expression.splice((previous_operator_index+1),(next_operator_index-previous_operator_index-1), result)
11.1.5.5. remove this index from the concatenation array
11.1.5.6. update each index of the division_array
11.1.5.6.1. for each index in the division array
11.1.5.6.1.1. if it is greater than or equal to next_operator_index
11.1.5.6.1.1.1. decrement it by (next_operator_index-previous_operator_index-1)
11.1.5.7. update each index of the product_array
11.1.5.7.1. for each index in the division array
11.1.5.7.1.1. if it is greater than or equal to next_operator_index
11.1.5.7.1.1.1. decrement it by (next_operator_index-previous_operator_index-1)
11.1.5.8. update each index of the sum_array
11.1.5.8.1. for each index in the division array
11.1.5.8.1.1. if it is greater than or equal to next_operator_index
11.1.5.8.1.1.1. decrement it by (next_operator_index-previous_operator_index-1)
11.1.5.9. update each index of the subtraction_array
11.1.5.9.1. for each index in the division array
11.1.5.9.1.1. if it is greater than or equal to next_operator_index
11.1.5.9.1.1.1. decrement it by (next_operator_index-previous_operator_index-1)
11.1.5.10. update each index of the concatenation_array
11.1.5.10.1. for each index in the division array
11.1.5.10.1.1. if it is greater than or equal to next_operator_index
11.1.5.10.1.1.1. decrement it by (next_operator_index-previous_operator_index-1)
11.1.6. increase the division_array index
12. if the multiplication array is not empty, repeat the product version of the steps from 11.1 to 11.1.6.
13. if the sum array is not empty, repeat the summation version of the steps from 11.1 to 11.1.6.
14. if the subtraction array is not empty, repeat the subtraction version of the steps from 11.1 to 11.1.6.
15. result holds the result of the operation.
*/

//let expression = ['250', '/', '5'];
//let expression = ['250', '/', '5', '/', '2', '/', '5', '/', '2'];
//let expression = ['250', '/', '5', '*', '2'];
//let expression = ['250', '/', '5', '*', '2', '*', '3'];
//let expression = ['4', '*', '250', '/', '5'];
//let expression = ['3', '*', '4', '*', '250', '/', '5'];
//let expression = ['250', '/', '5', '+', '2'];
//let expression = ['250', '/', '5', '+', '2', '+', '10'];
//let expression = ['10', '+', '250', '/', '5'];
//let expression = ['20', '+', '10', '+', '250', '/', '5'];
//let expression = ['160', '/', '4', '-', '13', '-', '12'];
//let expression = ['12', '+', '56', '/', '4', '-', '31', '*', '2'];
//let expression = ['12', '+', '56', '/', '4', '*', '31', '-', '2'];
//let expression = ['12', '+', '56', '*', '62', '/', '31', '-', '2'];
//let expression = ['12', '+', '56', '*', '62', '-', '31', '/', '2'];
//let expression = ['12', '+', '56', '-', '62', '/', '31', '*', '2'];
let expression = ['12', '+', '56', '-', '62', '*', '14', '/', '2'];

let div = [], cross = [], plus = [], minus = [];
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

let concatenationArray = div.concat(cross, plus, minus);
concatenationArray.sort(function(a, b) {
    return a - b;
});

// let a function be defined for the steps 11.1 to 11.1.6.
let reduceExpression = function(...opIndexArrays) {
    // the first element of the opIndexArrays is the index array of the 
    // highest-precedence operation. The rest of the arrays are the index arrays 
    // of lower-precedence operations.
    let opIndex, concatIndex, concatArrLength, firstOperand, secondOperand;
    let previousOpIndex, nextOpIndex;
    let result, operator;
    let expressionLength;
    while (opIndexArrays.length) {
        //console.log("The operation indices are as follows:");
        //console.log(opIndexArrays[0]);
        console.log(expression);
    while (opIndexArrays[0].length) {
        // opIndex is the index of the operation in the expression array
        opIndex = (opIndexArrays[0])[0];
        ////////////////////////////////////////////////////////////////////////
        // KEEP THIS PART IN MIND. IT CAN CAUSE PROBLEMS IN THE FUTURE!
        opIndexArrays[0].splice(0, 1);
        ////////////////////////////////////////////////////////////////////////
        operator = expression[opIndex];
        // locate the opIndex in the concatenation array
        concatIndex = concatenationArray.findIndex((element) => 
        element === opIndex);

        concatArrLength = concatenationArray.length;
        expressionLength = expression.length;
        if (concatIndex === 0) {
            firstOperand = expression.slice(0, opIndex);
            // console.log("First operand is " + firstOperand);
            if (concatArrLength === 1) {
                // console.log("Expression is as follows:");
                // console.log(expression);
                secondOperand = expression.slice((opIndex+1), expressionLength);
                // console.log("Second operand is " + secondOperand);
                // console.log("Operator is " + operator);
                result = getResult(operator, firstOperand, secondOperand);
                // console.log("Result is " + result);
                expression.splice(0, expressionLength, result);
                concatenationArray.splice(concatIndex, 1);
            }
            else {
                // console.log("Expression is as follows:");
                // console.log(expression);
                nextOpIndex = concatenationArray[1];
                secondOperand = expression.slice((opIndex+1), nextOpIndex);
                // console.log("Second operand is " + secondOperand);
                // console.log("Operator is " + operator);
                result = getResult(operator, firstOperand, secondOperand);
                // console.log("Result is " + result);
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
            // console.log("Previous operator index is " + previousOpIndex);
            // first_operand = expression[(previous_operator_index+1):div_index]
            firstOperand = expression.slice(previousOpIndex + 1, opIndex);
            // console.log("First operand is " + firstOperand);
            // second_operand = expression[(div_index+1):expression_length]
            secondOperand = expression.slice(opIndex + 1, expressionLength);
            // console.log("Second operand is " + secondOperand);
            // result = (+first_operand) / (+second_operand)
            result = getResult(operator, firstOperand, secondOperand);
            // console.log("Result is " + result);
            // expression.splice((previous_operator_index+1),(expression_length-(previous_operator_index+1)), result)
            expression.splice((previousOpIndex+1), 
            (expressionLength-(previousOpIndex+1)), result);
            // console.log(expression);
            // remove this index from the concatenation array
            concatenationArray.splice(concatIndex, 1);
            concatenationArray.sort(function(a, b) {
                return a - b;
            });
            // console.log(concatenationArray);
        }
        else {
            //console.log("The expression is as follows:");
            //console.log(expression);
            previousOpIndex = concatenationArray[concatIndex - 1];
            //console.log("Previous operator index is " + previousOpIndex);
            firstOperand = expression.slice(previousOpIndex + 1, opIndex);
            // console.log("First operand is " + firstOperand);
            nextOpIndex = concatenationArray[concatIndex + 1];
            //console.log("Next operator index is " + nextOpIndex);
            secondOperand = expression.slice((opIndex + 1), nextOpIndex);
            // console.log("Second operand is " + secondOperand);
            result = getResult(operator, firstOperand, secondOperand);
            // console.log("Result is " + result);
            // expression.splice((previous_operator_index+1),(next_operator_index-previous_operator_index-1), result)
            expression.splice((previousOpIndex + 1), 
            (nextOpIndex - (previousOpIndex + 1)), result);
            // console.log(expression);
            concatenationArray.splice(concatIndex, 1);
            // console.log(concatenationArray);
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
            //console.log("Operator index arrays are as follows:");
            //opIndexArrays.forEach((element) => {
            //    console.log(element);
            //})
            //console.log("Concatenation array is as follows:");
            //console.log(concatenationArray);
            //console.log("The expression is as follows:");
            //console.log(expression);
        }
    }
    opIndexArrays.splice(0, 1);
}
    return expression[0];
}

let calc_result = reduceExpression(div, cross, plus, minus);

console.log("The result of the calculation is " + calc_result);
