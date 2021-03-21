let surname = document.querySelector('.profile__name');
let information = document.querySelector('.profile__information');
let oldName = document.getElementById('name');
let oldInformation = document.getElementById('information');
let popup = document.querySelector('.popup');
function openPopup() {
  popup.classList.add('popup_visible');
  oldInformation.placeholder = information.textContent;
  oldName.placeholder = surname.textContent;
}
let edit = document.getElementById('edit');
edit.addEventListener('click', openPopup);

/*let submit = document.getElementById('submit');
function submitProfile () {
  surname.textContent = oldName.value;
  information.textContent = oldInformation.value;
  popup.classList.remove('popup_visible');
}
submit.addEventListener('click', submitProfile);*/

let formElement = document.querySelector('.popup-form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_visible');
}

let submit = document.getElementById('submit');
submit.addEventListener('click', formSubmitHandler);

let closeButton = document.getElementById('close-button');
function closePopup() {
  popup.classList.remove('popup_visible');
}
closeButton.addEventListener('click', closePopup);
