const operation = document.querySelector("#operation");
const resultNode = document.querySelector("#result");
const form = document.querySelector("form");
const numbers = Array.from(form.querySelectorAll("input"));

// Checking the entered character.
// Number -> true, Character -> false
const isNumber = value => {
    return Number.isNaN(parseInt(value)) ? false : true;
};

// Getting calculated numbers
const getNumbers = strings => {
    return strings.map(string =>
        string.length && string !== "-" ? parseFloat(string) : 0
    );
};

// Handling input values
// ignoring chars and other symbols
// exept numbers and "-" in the begenning of the string
const inputHandler = e => {
    if (e.target.classList.contains("error")) {
        e.target.classList.remove("error");
    }

    const inputPosition = e.target.value.lastIndexOf(e.data);
    if (e.data === "-") {
        if (inputPosition > 0 && inputPosition < e.target.value.length) {
            e.target.value =
                e.target.value.slice(0, inputPosition) +
                e.target.value.slice(inputPosition + 1);
        }
    } else {
        if (!isNumber(e.data) && e.inputType === "insertText") {
            e.target.value = e.target.value.slice(0, -1);
        }
    }
};

// Handling Submit event.
// Calculating inputed values
const calculateHandler = event => {
    event.preventDefault();

    let result;
    const [a, b] = getNumbers(numbers.map(number => number.value));

    switch (operation.value) {
        case "-":
            result = Math.round(a - b);
            break;
        case "*":
            result = Math.round(a * b);
            break;
        case "/":
            if (b === 0) {
                numbers[1].classList.add("error");
                numbers[1].focus();
                result = Infinity;
                alert("Number B must be different from 0");
            } else {
                result = Math.round(a / b);
            }
            break;
        case "+":
        default:
            result = Math.round(a + b);
    }

    resultNode.innerText = result;
};

// Assignin event listeners
form.addEventListener("submit", calculateHandler);
numbers.forEach(number => number.addEventListener("input", inputHandler));
