// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = inputElement.validationMessage;
    inputElement.classList.add('modal__input-error-underscore');
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = "";
    inputElement.classList.remove('modal__input-error-underscore');
}

function checkInputValidity(formElement, inputElement, options) { 
    if(!inputElement.validity.valid) {
        return showInputError(formElement, inputElement, options);   
    } 
    hideInputError(formElement, inputElement, options);    
}

function setEventListeners(formElement, options) {
    // object de-structuring
    const {inputSelector} = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(options.submitButtonSelector);
    //
    inputElements.forEach( inputElement => {
        inputElement.addEventListener('input', (evt) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton);
        });
    });
}

function hasInvalidInput(inputList) {
    return !inputList.every(inputEl => inputEl.validity.valid);
}

function disableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;  
}

function enableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;   
}

function toggleButtonState(inputElements, submitButton, {inactiveButtonClass} = config) {
    if(hasInvalidInput(inputElements, inactiveButtonClass)) {
        disableButton(submitButton);
    } else {
        enableButton(submitButton, inactiveButtonClass);
    }
}

function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        setEventListeners(formElement, options);
    }); 
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector : ".modal__save-button",
    inactiveButtonClass: "modal__save-button-disabled",
    inputErrorClass: "modal__input-type-error",
    errorClass: "modal__error-visible"
}


enableValidation(config);

