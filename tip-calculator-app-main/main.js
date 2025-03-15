/* declaing variables */

const formValues = document.getElementsByClassName('form-part');
const tipButtons = document.getElementsByClassName('tip');

const totalBillDisplay = document.getElementById('total-per-person');
const totalTipDisplay = document.getElementById('tip-per-person');

const customButton = document.querySelector('.tip.custom');

const tipValueHolder = document.getElementById('tipValue');

const resetButton = document.getElementById('reset');


let activeTipButton = null;
let userInteracting = false;


/* declaring functions */

function handleChange () {

    if (!userInteracting) {
        userInteracting = true;
        resetButton.classList.add('active');
    }

    if (validateInputs()) {
        totalBillDisplay.classList.remove('invalid');
        totalTipDisplay.classList.remove('invalid');
        calculateTip();
    }
    else {
        totalBillDisplay.classList.add('invalid');
        totalTipDisplay.classList.add('invalid');
        totalBillDisplay.innerText = '$0.00';
        totalTipDisplay.innerText = '$0.00';
    }
}

function setTipValue (e) {
   
    const clickedTip = e.currentTarget;
    const tipValue = clickedTip.innerText.replace('%', '');
    const valueContainer = document.getElementById('tipValue');

    if (activeTipButton != null) {
        activeTipButton.classList.remove('active');
    }
    clickedTip.classList.add('active');
    activeTipButton = clickedTip;
    valueContainer.innerText = tipValue;

    handleChange();
}

function validateInputs () {
    const inputs = Array.from(document.querySelectorAll('.form-part'));
    
    
    let valid = true;

    for (const element of inputs) {
        const _number = parseFloat(element.innerText.trim());
        if ((element.id != 'tipValue' && _number == 0) || isNaN(_number)) {
            element.classList.add('invalid');
            valid = false;
        }
        else {
            element.classList.remove('invalid');
        }
    }
    
    return valid;


}

function calculateTip() {

    const tipInputs = Object.values(formValues);
    const tipValues = {};
    let totalBill = Number();
    let totalTip = Number();
    let billPerPerson = Number();
    let tipPerPerson = Number();

    tipInputs.forEach((input) => {
        tipValues[input.id] = parseFloat(input.innerText.trim());
        
    }); 

   
    let tip = tipValues.tipValue

    if (tip == 0) tip = 100;
    
    totalTip = tipValues.bill * (tipValues.tipValue / 100);
    totalBill = totalTip + tipValues.bill;
    billPerPerson = (totalBill / tipValues.people).toFixed(2);
    tipPerPerson = (totalTip / tipValues.people).toFixed(2);
   
    

    totalBillDisplay.innerText = `$${billPerPerson}`;
    totalTipDisplay.innerText = `$${tipPerPerson}`;



}


/* assigning and executing */


for (const button of Object.values(tipButtons)) {
    button.addEventListener('click', setTipValue);
    
}



customButton.addEventListener('input', () => {
        setTipValue({currentTarget: customButton});
    });



for (const input of Object.values(formValues)) {
    
    if (input.id != 'tipValue') {
        input.addEventListener('input', handleChange);
        
    }
   
}

document.querySelectorAll('[contenteditable="true"]').forEach((element) => {

    element.addEventListener('click', (e) => {
        const clicked = e.currentTarget;
        const clickedValue = parseFloat(clicked.innerText.trim());
        
        if (clickedValue == 0 || isNaN(clickedValue)) {
            clicked.innerText = '';
        }
    })

    element.addEventListener('focusout', (e) => {
        if (e.currentTarget.innerText == '') {
            e.currentTarget.innerText = '0';
            if (e.currentTarget.id == 'custom') {
                tipValueHolder.innerText = '0';
                e.currentTarget.classList.remove('invalid');
            }
        }
        handleChange();
    })



    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            element.blur();
            return;
        }

        
        if (
            !/[0-9]/.test(e.key) && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) && 
            e.key !== '.' && 
            e.key !== ',' 
        ) {
            e.preventDefault();
        }

        
        if ((e.key === '.' || e.key === ',') && element.innerText.includes(e.key)) {
            e.preventDefault();
        }
    });

    
    element.addEventListener('paste', (e) => {
        e.preventDefault();
        
    });
});


resetButton.addEventListener('click', () => {

    resetButton.classList.remove('active');
    activeTipButton = null;

    for (const button of Object.values(tipButtons)) {
        button.classList.remove('active');

    }; 

    for (const element of Object.values(formValues)) {
        element.classList.remove('invalid');
        element.innerText = '0';
        if (element.id == 'tipValue') element.innerText = 'Custom';

    }

    totalBillDisplay.classList.add('invalid');
    totalBillDisplay.innerText = '$0.00';
    totalTipDisplay.classList.add('invalid');
    totalTipDisplay.innerText = '$0.00';

    customButton.classList.remove('invalid');
    customButton.innerText = 'Custom';

    userInteracting = false;

    });