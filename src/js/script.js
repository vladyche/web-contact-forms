const form = document.querySelector('.contact-form > #cf1');

form.addEventListener('submit', formHandler);

function formHandler(e) {
    e.preventDefault();

    //data from form elements
    const nameElementValue = this.elements['name'].value;
    const emailElementValue = this.elements['email'].value;

    // validation
    let name = nameValidation(nameElementValue);
    let email = emailValidation(emailElementValue);

    if (name && email) {

        //build data object 
        let data = {};
        data.name = nameElementValue;
        data.email = emailElementValue;

        // send data
        sendData(data);

        //clear field
        clearFields();
    }
}

//name validation
function nameValidation(name) {

    //clear error message info if name is valid
    nameErrorInfo = document.querySelector('.name-error-info > .message');
    nameErrorInfo.innerHTML = "";

    const pattern = /[A-Z][a-z]+/;

    let error = pattern.test(name);

    if (!error) {
        nameErrorMessage();
        nameInput();
        return false;
    }

    return true;
}

//email validation
function emailValidation(email) {

    //clear error message info if email is valid
    emailErrorInfo = document.querySelector('.email-error-info > .message');
    emailErrorInfo.innerHTML = "";

    const pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    let error = pattern.test(email);

    if (!error) {
        emailErrorMessage();
        emailInput();
        return false;
    }

    return true;
}

// clear error messages
function nameInput() {
    const nameInput = document.querySelector('.fld-input > input[name="name"]');
    const error = document.querySelector('#cf1 .name-error > .message');
    nameInput.addEventListener('input', remove);

    function remove() {
        error.innerHTML = "";

        if (error.innerText.length == 0) {
            nameInput.removeEventListener('input', remove);
        }
    }
}

function emailInput() {
    const emailInput = document.querySelector('.fld-input > input[name="email"]');
    const error = document.querySelector('#cf1 .email-error > .message');

    emailInput.addEventListener('input', remove);

    function remove() {
        error.innerHTML = "";

        if (error.innerText.length == 0) {
            emailInput.removeEventListener('input', remove);
        }
    }
}
// end clear error messages

// error messages
const errorMessages = {
    nameError: "Name is incorrect",
    nameErrorInfo: "more then one letters, first must be capital",
    emailError: "Email is incorrect",
    emailErrorInfo: "format example@email.com"
}

//error message for name field
function nameErrorMessage() {
    const error = document.querySelector('#cf1 .name-error > .message');
    error.innerHTML = errorMessages.nameError;
    const errorInfo = document.querySelector('#cf1 .name-error-info > .message');
    errorInfo.innerHTML = errorMessages.nameErrorInfo;
}

//error message for email field
function emailErrorMessage() {
    const error = document.querySelector('#cf1 .email-error > .message');
    error.innerHTML = errorMessages.emailError;
    const errorInfo = document.querySelector('#cf1 .email-error-info > .message');
    errorInfo.innerHTML = errorMessages.emailErrorInfo;
}

//status: send|success|error
function preloaderMode(prms) {
    const modes = document.querySelectorAll('.preloader-modes > .mode');
    const preloader = document.querySelector('.preloader');
    const successModeMessage = document.querySelector('.success-mode > .preloader-message > .message');
    const errorModeMessage = document.querySelector('.error-mode > .preloader-message > .message');

    switch (prms.mode) {

        case 'send': {
            preloader.classList.add('display');
            preloader.classList.add('visible');

            modes[0].classList.add('switch-on');

            break;
        }

        case 'success': {
            modes[1].classList.add('switch-on');

            for (let i = 0; i < modes.length; i++) {
                if (i != 1) {
                    modes[i].classList.remove('switch-on');
                }
            }

            successModeMessage.innerHTML = "Sent";

            break;
        }

        case 'error': {
            modes[2].classList.add('switch-on');

            for (let i = 0; i < modes.length; i++) {
                if (i != 2) {
                    modes[i].classList.remove('switch-on');
                }
            }

            errorModeMessage.innerHTML = "Error";

            break;
        }

        default: { }
    }
}

(function preloaderClose() {
    const close = document.querySelectorAll('.preloader .preloader-close > .btn');
    const preloader = document.querySelector('.contact-form > .preloader');
    const modes = document.querySelectorAll('.preloader-modes > .mode');
    const successModeMessage = document.querySelector('.success-mode > .preloader-message > .message');
    const errorModeMessage = document.querySelector('.error-mode > .preloader-message > .message');

    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {

            // close preloader
            preloader.classList.remove('visible');
            setTimeout(() => {
                preloader.classList.remove('display');
            }, 500);

            //switch off modes
            for (let i = 0; i < modes.length; i++) {
                modes[i].classList.remove('switch-on');
            }

            //clear messages
            successModeMessage.innerHTML = "";
            errorModeMessage.innerHTML = "";
        });
    }
})();

(function clearErrorMessage() {
    const successModeMessage = document.querySelector('.success-mode > .preloader-message > .message');
    const errorModeMessage = document.querySelector('.error-mode > .preloader-message > .message');
    const link = document.querySelector('.preloader-message > .error-link .link');

    link.addEventListener('click', function () {
        successModeMessage.innerHTML = "";
        errorModeMessage.innerHTML = "";
    });
})();

//clear form fields
function clearFields() {
    nameErrorInfo = document.querySelector('.name-error-info > .message');
    emailErrorInfo = document.querySelector('.email-error-info > .message');

    nameErrorInfo.innerHTML = "";
    emailErrorInfo.innerHTML = "";

    form.reset();
}

function sendData(data) {

    //mode: send|success|error
    preloaderMode({ mode: "send" });

    // test preloader mode
    setTimeout(() => {
        preloaderMode({ mode: "success" });
    }, 5000);

    setTimeout(() => {
        preloaderMode({ mode: "error" });
    }, 10000);
    //end test preloader mode

}