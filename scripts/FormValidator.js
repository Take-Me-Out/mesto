//Валидация форм

/*const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
    });
  })
}

function resetForm(item, config) {
  const closeForm = item.querySelector(config.formSelector);
  closeForm.reset();
  const errorList = Array.from(closeForm.querySelectorAll(config.errorClass));
  errorList.forEach((errorElement) => {
    errorElement.classList.remove(config.errorClass);
      });
  const buttonElement = item.querySelector(config.submitButtonSelector);
  const inputList = Array.from(item.querySelectorAll(config.inputSelector));
  toggleButtonState(inputList, buttonElement, config);
}*/



/*enableValidation(validationConfig);*/

export default class FormValidation {
  constructor(data, inputForm) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputForm = inputForm;
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._data = data;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation = () => {
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    });
    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement);
      });
  }

  resetForm = (item) => {
    const closeForm = item.querySelector(this._formSelector);
    closeForm.reset();
    const errorList = Array.from(closeForm.querySelectorAll(this._errorClass));
    errorList.forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
        });
    const buttonElement = item.querySelector(this._submitButtonSelector);
    const inputList = Array.from(item.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList, buttonElement);
  }
}
