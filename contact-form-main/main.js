const VALIDATION_FUNCTIONS = {
    'givenName': function (value) { return /^[a-z]+(?:\s[a-z]+)*$/i.test(value) },
    'familyName': function (value) { return /^[a-z]+(?:\s[a-z]+)*$/i.test(value) },
    'email': function (value) { return /^[a-zA-Z\+-_~!#$€&'\.\/=\^´{\|}]+@(?:[a-zA-Z0-9-]+)(?:\.[^\-][a-zA-Z0-9-]*[^\-])+$/.test(value) },
    'queryType': function () { return true },
    'message': function () { return true },
    'consent': function (value) { return value },

}


const CONTACTFORM = document.querySelector('.contactform')


CONTACTFORM.addEventListener('submit', (e) => {
    e.preventDefault()

    const inData = Array.from(e.currentTarget)
        .filter((elm) => elm.classList.contains('__validate'))
    
    const email = inData.filter((elm) => elm.name == 'email')[0].value
    
    if (validateContactForm(inData)) throwSuccess(email)
}

)
CONTACTFORM.addEventListener('focusout', (e) => {

    if (e.target.classList.contains('__validate')) validateContactForm([e.target])

})


CONTACTFORM.addEventListener('invalid', (e) => {
    e.preventDefault()
}, true)

function validateContactForm(inData) {

    let valid = true;
    inData.forEach((elm) => {
        console.log(elm.name)
        let inputValue
        if (elm.classList.contains('__radioset')) {
            elm.querySelectorAll('.__radio').forEach(radio => { if (radio.checked) inputValue = radio.value });
        } else if (elm.name == 'consent') {
            inputValue = elm.checked
        } else inputValue = elm.value

        if (!inputValue) {
            valid = false;
            elm.classList.add('__invalid-missing')
        } else if (!VALIDATION_FUNCTIONS[elm.name](inputValue)) {
            elm.classList.remove('__invalid-missing')
            valid = false
            elm.classList.add('__invalid')
        } else {
            elm.classList.remove('__invalid')
            elm.classList.remove('__invalid-missing')
        }
    });

    return valid
}


function throwSuccess(mail) {
    const toast = document.querySelector('.__success')
    document.querySelector('.__email-conf').innerHTML = mail
        document.querySelector('form').reset()


    toast.classList.toggle('__valid')
    setTimeout(() => {
        toast.classList.toggle('__valid')
    }
        , 4000);
}