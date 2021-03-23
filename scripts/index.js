let surname = document.querySelector('.profile__name');
let information = document.querySelector('.profile__information');
let oldName = document.querySelector('.popup-form__input_id_name');
let oldInformation = document.querySelector('.popup-form__input_id_information');
let popup = document.querySelector('.popup');
function openPopup() {
  popup.classList.add('popup_visible');
  oldInformation.textContent = information.textContent;
  oldName.textContent = surname.textContent;
}
let edit = document.querySelector('.profile__edit-button');
edit.addEventListener('click', openPopup);

let closeButton = document.querySelector('.popup__close-button');
function closePopup() {
  popup.classList.remove('popup_visible');
}
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup-form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  surname.textContent = oldName.value;
  information.textContent = oldInformation.value;
  /*popup.classList.remove('popup_visible');*/
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
