const display = document.getElementById('display');

function appendToDisplay(input) {
    if (display.value.replace(/,/g, '').length < 20) {  
        if (input === '.' && display.value.includes('.')) return;

        display.value += input;
        display.value = formatDisplay(display.value.replace(/,/g, ''));  
    }
}

function clearDisplay() {
    display.value = "";
}

function delDisplay() {
    display.value = display.value.slice(0, -1);
    display.value = formatDisplay(display.value.replace(/,/g, ''));  
}

function calculate() {
    try {
        let result = eval(display.value.replace(/,/g, '')); 
        if (Number.isInteger(result)) {
            display.value = formatDisplay(result.toString());
        } else {
            let number = Number(result);
            let decimalNumber = number.toString().split('.')[1].length;
            display.value = formatDisplay(number.toFixed(decimalNumber));
        }
    } catch (error) {
        display.value = "Error";
    }
}

function formatDisplay(value) {
    let parts = value.split(/([+\-*/])/);  // Misahkan operator
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i]) && parts[i] !== '') {  
            parts[i] = formatNumber(parts[i]);
        }
    }
    return parts.join('');
}

function formatNumber(value) {
    value = value.replace(/,/g, '');  // Ngapus koma
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    
    let result = '';
    let count = 0;
    
    for (let i = integerPart.length - 1; i >= 0; i--) {
        result = integerPart[i] + result;
        count++;
        if (count === 3 && i !== 0) {
            result = ',' + result;
            count = 0;
        }
    }
    
    return result + decimalPart;
}

function toogleSign() {
    if (display.value.startsWith('-')) {
        display.value = display.value.substring(1);
    } else {
        display.value = '-' + display.value;
    }
}
