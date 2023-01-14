const form = document.querySelector('.cf');
const preloader = document.querySelector('.cf > .preloader');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = {};

    let name = nameValidation(form.elements['name']);
    let email = emailValidation(form.elements['email']);

    if (name && email) {
        sendData();
    }

    //access to elements
    //validation fields
    //build object
    //switch on preloader
    //make ajax request
    //waiting for response
    //actions after geting response
});

//name validation
function nameValidation(name) {
    let error = true;

    if (error) {
        nameErrorMessage();
    }

    return true;
}

//email validation
function emailValidation(email) {
    let error = true;

    if (error) {
        emailErrorMessage();
    }

    return true;
}

//error message for name field
function nameErrorMessage() {
    console.log('name error');
}

//error message for email field
function emailErrorMessage() {
    console.log('email error');
}

function sendData() {
    console.log('sending data');
}