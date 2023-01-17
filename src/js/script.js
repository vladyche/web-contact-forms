const form = document.querySelector('.contact-form > .form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    //elements value
    const nameElementValue = form.elements['name'].value;
    const emailElementValue = form.elements['email'].value;

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
});

//name validation
function nameValidation(name) {

    // regexp result validation
    let error = false;

    if (error) {
        nameErrorMessage();
        return false;
    }

    return true;
}

//email validation
function emailValidation(email) {

    // regexp result validation
    let error = false;

    if (error) {
        emailErrorMessage();
        return false;
    }

    return true;
}

const errorMessages = {
    nameError: "Name is incorrect",
    nameErrorInfo: "2 - 20 letters, first must be capital",
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

//clear form fields
function clearFields() {
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