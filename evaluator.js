//inserts a string right after position
function addCharacter(pos, character, input) {
    return input.substring(0, pos + 1) + character + input.substring(pos + 1);
}

//formats and transforms the input string into an expression compatible with the JavaScript eval() function
function transform(input) {
    /**** DECLARE AND INITIALIZE REGULAR EXPRESSIONS */
    const digitParenRegex = /[0-9x](?=\()/;
    const parenDigitRegex = /\)(?=[0-9x])/;
    const parenParenRegex = /\)(?=\()/;
    const minusMinusRegex = /\-(?=\-)/;
    const digitVarRegex = /[0-9](?=x)/;
    const impliedNegativeRegex = /\-(?=x)/;

    //format the expression with standard JavaScript math operators. Change parentheses to standard ()
    input = input.replace(/\^/g, '**');
    input = input.replace(/[-˗−﹣－]/g, '-');
    input = input.replace(/÷/g, '/');
    input = input.replace(/[×·✕]/g, '*');
    input = input.replace(/ /g, '');
    input = input.replace(/[\[\{]/g, '(');
    input = input.replace(/[\]\}]/g, ')');
    
    //search for the above regular expressions and insert necessary operators, spaces, and digits 
    //into the expression to prevent errors when calling eval()
    while (digitParenRegex.test(input)) {
        let pos = input.search(digitParenRegex);
        input = addCharacter(pos, '*', input);
    }
    while (parenDigitRegex.test(input)) {
        let pos = input.search(parenDigitRegex);
        input = addCharacter(pos, '*', input);
    }
    while (parenParenRegex.test(input)) {
        let pos = input.search(parenParenRegex);
        input = addCharacter(pos, '*', input);
    }
    while (minusMinusRegex.test(input)) {
        let pos = input.search(minusMinusRegex);
        input = addCharacter(pos, ' ', input);
    }
    while (digitVarRegex.test(input)) {
        let pos = input.search(digitVarRegex);
        input = addCharacter(pos, '*', input);
    }
    while (impliedNegativeRegex.test(input)) {
        let pos = input.search(impliedNegativeRegex);
        input = addCharacter(pos, '1*', input);
    }

    return input;
}

//tests if parentheses are paired in the expression
function isPaired(input) {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === '(') {
            count++;
        }
        if (input.charAt(i) === ')') {
            count--;
        }
    }
    return (count == 0 ? true : false);
}

//executes the calculation for a PEMDAS expression
function calculatePEMDAS() {
    let PEMDASExpression = document.getElementById('PEMDASExpression').value;
    //transforms and formats expression
    PEMDASExpression = transform(PEMDASExpression);
    
    //tests for paired parentheses
    if (!isPaired(PEMDASExpression)) {
        document.getElementById('PEMDASResult').innerHTML = 'Error! Please make sure that all your brackets and parentheses are paired.';
        return;
    }

    //evaluate and show output
    let PEMDASResult = eval(PEMDASExpression);
    document.getElementById('PEMDASResult').innerHTML = `Equals: ${PEMDASResult}`;

}

//executes the calculation for a function expression
function calculateFunction() {
    let functionExpression = document.getElementById('functionExpression').value;
    //initializes the x value for the function
    let x = parseFloat(document.getElementById('xValue').value);
    //transforms and formats function
    functionExpression = transform(functionExpression);
    
    //tests for paired parentheses
    if (!isPaired(functionExpression)) {
        document.getElementById('functionResult').innerHTML = 'Error! Please make sure that all your brackets and parentheses are paired.';
        return;
    }

    //evaluate and show ou
    let functionResult = eval(functionExpression);
    document.getElementById('functionResult').innerHTML = `Equals: ${functionResult}`;

}
