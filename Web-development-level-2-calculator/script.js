const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// =========================
// Numbers
// =========================

numberButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const number = button.textContent;

        if (display.value === "Error") {
            display.value = number;
            waitingForSecondNumber = false;
            return;
        }

        if (waitingForSecondNumber) {

            display.value = number;

            waitingForSecondNumber = false;

        } else {

            if (display.value === "0") {

                display.value = number;

            } else {

                display.value += number;

            }

        }

    });

});


// =========================
// Operators
// =========================

operatorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (display.value === "Error") {
            return;
        }

        // Prevent two operators in a row
        if (waitingForSecondNumber) {
            return;
        }

        firstNumber = Number(display.value);

        operator = button.dataset.operator;

        display.value =
            display.value + " " + button.textContent + " ";

        waitingForSecondNumber = true;

    });

});


// =========================
// Decimal
// =========================

decimalButton.addEventListener("click", function () {

    if (display.value === "Error") {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (waitingForSecondNumber) {

        display.value = "0.";

        waitingForSecondNumber = false;

        return;
    }

    // Get the current number only
    const parts = display.value.trim().split(" ");

    const currentNumber = parts[parts.length - 1];

    if (!currentNumber.includes(".")) {

        display.value += ".";

    }

});


// =========================
// Calculate
// =========================

equalsButton.addEventListener("click", function () {

    if (
        firstNumber === null ||
        operator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const parts = display.value.trim().split(" ");

    const secondNumber = Number(parts[parts.length - 1]);

    let result;


    if (operator === "+") {

        result = firstNumber + secondNumber;

    }

    else if (operator === "-") {

        result = firstNumber - secondNumber;

    }

    else if (operator === "*") {

        result = firstNumber * secondNumber;

    }

    else if (operator === "/") {

        if (secondNumber === 0) {

            display.value = "Error";

            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;

            return;
        }

        result = firstNumber / secondNumber;

    }

    else if (operator === "%") {

        result = firstNumber % secondNumber;

    }


    display.value = result;

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;

});


// =========================
// Clear
// =========================

clearButton.addEventListener("click", function () {

    display.value = "0";

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

});


// =========================
// Delete
// =========================

deleteButton.addEventListener("click", function () {

    if (display.value === "Error") {

        display.value = "0";

        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;

        return;
    }

    // Remove spaces at the end
    display.value = display.value.trimEnd();

    // Remove last character
    if (display.value.length > 1) {

        display.value = display.value.slice(0, -1);

    } else {

        display.value = "0";

    }

    // Remove spaces again
    display.value = display.value.trimEnd();

});