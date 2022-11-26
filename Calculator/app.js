const buttons = document.querySelectorAll('button'),
      operators = document.querySelectorAll('#operators button'),
      input = document.querySelector('#input'),
      output = document.querySelector('output'),
      container = document.querySelector('#container'),
      ops = ['*', '/', '+', '-']

buttons.forEach(btn => {
    btn.addEventListener('click', () => updateInput(btn.value));
})

function updateInput(inp) {
    // numbers
    if (isNaN(inp) == false) {
        // if the input is 0 replace it instead of adding to it
        if (input.value != '0') {
            if (input.value.charAt(input.value.length-1) == ')')
                input.value += '*' + inp;
            else input.value += inp;
        } 
        else input.value = inp;
    }
    // operators
    if (charIsAnyOf(inp, ops)) {
        // check if te last character is an operator, in which case we replace it with the new operator
        if (charIsAnyOf(input.value.charAt(input.value.length-1), ops)) {
            input.value = input.value.slice(0, -1) + inp;
        }
        // if we typed a dot or opened a paranthesis we're not allowed to type an operator except a minus
        else if (charIsAnyOf(input.value.charAt(input.value.length - 1), ['.', '(']) == false)
            input.value += inp;
        if (input.value.charAt(input.value.length - 1) == '(' && inp == '-')
            input.value += inp;
    }
    // paranthesis
    if (inp == 'paranthesis') {
        let countOpen = 0, countClosed = 0;
        // count how many parathesis are opened and closed
        for (ch of input.value) {
            if (ch == '(') {
                countOpen++;
            }
            else if (ch == ')') {
                countClosed++
            }
        }
        // if we just opened a paranthesis we we'll open another one inside it
        if (input.value.charAt(input.value.length - 1) == '(') {
            input.value += '(';
            countOpen++;
        }
        // we are not allowed to close a paranthesis next to a dot
        else if (charIsAnyOf(input.value.charAt(input.value.length - 1), ['(', '.']) == false) {
            // we are not allowed to close a paranthesis next to an operator
            if (charIsAnyOf(input.value.charAt(input.value.length -1), ops)) {
                input.value += '(';
                countOpen++;
            }
            // if it's a valid place to close a paranthesis we check first if there are any unclosed
            else if (countOpen > countClosed) {
                input.value += ')';
                countClosed++;
            }
            // if the last character is a number we need to add a multiply symbol before the opening paranthesis
            else if (input.value != '0') {
                input.value += '*(';
                countOpen++;
            }
        }
        // we replace the initial zero
        if (input.value == '0') 
        input.value = '(';
    }
        
    // backspace
    if (inp == 'clear') {
        input.value = input.value.slice(0,-1);
        if (input.value == '' || input.value == 'Infinit') input.value = 0;
    }
    // clear all
    if (inp == 'clear-all') {
        input.value = '0';
    }
    // equal
    if (inp == 'equal') {
        input.value=eval(input.value);
        if (output.value != '' && output.value.length < 12) {
            input.classList.add('animate');
            output.classList.add('animate');
            setTimeout(() => {
                output.value = ''
                output.setAttribute('data-value', '');
                input.classList.remove('animate');
                output.classList.remove('animate');
            }, 1000)
        }
        else output.value = '';
    }
    // dot
    if (inp == '.') {
        // the dot is only allowed after a digit, obviously
        if (isNaN(input.value.charAt(input.value.length -1)) == false) {
            for (op of ops) {
                // check if we are writing a different number (if it's preceded by an operator)
                if (input.value.lastIndexOf(op) != -1 
                && input.value.slice(input.value.lastIndexOf(op), input.value.length - 1).includes('.') == false) {
                    input.value += inp;
                    break;
                }
            }
            if (input.value.includes('.') == false) {
                input.value += inp;
            }
        }
    }

    // always keep the input scrolled down in case of long operations
    input.scrollTop = input.scrollWidth;
    // constantly update the output
    // try-catch is used to prevent the console from spitting errors when the operation is not complete
    if (inp != 'equal') {
        try {
            output.value = eval(input.value);
            output.setAttribute('data-value', output.value);
        }
        catch(input) {};
    }

    // when the operation gets long we disable the animation and expand the height of the input container
    if (output.value.length > 12) output.setAttribute('data-value', '');

    if (input.value.length > 12) container.classList.add('expanded')
        else container.classList.remove('expanded')
}

// helper function to check if a character is equal to one of the elements of a given array
function charIsAnyOf(ch, [...chars]) {
    for (char of chars) {
        if (char == ch) return true;
    }
    return false;
}