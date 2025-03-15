const signUpForm = document.getElementById('sign-up-form');
const signUpLabel = document.getElementById('sign-up-label');
const successMessage = document.getElementById('success-message');
const confirmedMailSpan = document.getElementById('confirmed-email');
const dismissButton = document.getElementById('dismiss-button');


function validateSignUp(e) {
    e.preventDefault();


    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const emailString = data.email;

    const emailParts = emailString.split('@');

    if (emailParts.length != 2) {
        signUpLabel.classList.add('active');
        return;
    } 
    else if (emailParts[1].split('.').length < 2) {
        signUpLabel.classList.add('active');
        return;
    }
    else {
        
        confirmedMailSpan.innerText = emailString;
        signUpLabel.classList.remove('active');
        successMessage.classList.toggle('active');
    }




}



signUpForm.addEventListener('submit', validateSignUp);
dismissButton.addEventListener('click', function() {
    successMessage.classList.toggle('active');
})