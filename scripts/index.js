import FormValidation from './FormValidator.js';
import {initialCards} from './initial-сards.js';
import Card from './Card.js';
export {closePopup, openPopup}

const cardConfig = {
  elements: document.querySelector('.elements'),
  element: '.element',
  template: '.elements__template',
  galleryTemplate: document.querySelector('.elements__template').content,
  popupPhoto: '.popup_id_photo',
  popupPhotoElement: document.querySelector('.popup_id_photo'),
  popupPhotoImage: '.popup__photo-image',
  popupPhotoCaption: '.popup__photo-caption',
  popupEdit: '.popup_id_edit-profile',
  inputUserName: '.popup-form__input_id_name',
  inputUserProfession: '.popup-form__input_id_information',
  userProfession: '.profile__information',
  userName: '.profile__name',
  opeEditProfileButton: '.profile__edit-button',
  closeButton: '.popup__close-button',
  popup: 'popup',
  formAddCard: '.popup-form_id_add-card',
  cardText: '.element__city',
  cardImage: '.element__photo',
  deleteButton: '.element__delete-button',
  likeButton: '.element__like-button',
  likeButtonActive: 'element__like-button_active',
  popupAddInputLink: document.querySelector('.popup-form__input_id_link'),
  popupAddInputName: document.querySelector('.popup-form__input_id_place'),
  popupAddInputAlt: document.querySelector('.popup-form__input_id_place'),
  popupVisible: '.popup_visible',
  popupVisibleToggle: 'popup_visible'
}

const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
 }


const userName = document.querySelector(cardConfig.userName);
const userProfession = document.querySelector(cardConfig.userProfession);
const inputUserName = document.querySelector(cardConfig.inputUserName);
const inputUserProfession = document.querySelector(cardConfig.inputUserProfession);
const popupEdit = document.querySelector('.popup_id_edit-profile');
const openEditProfileButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button');
const formEditProfile = document.querySelector('.popup-form_id_edit-profile');
const popupAdd = document.querySelector('.popup_id_add-card');
const addPhoto = document.querySelector('.profile__add-photo-button');
const formAddCard = popupAdd.querySelector(cardConfig.formAddCard);
const popupPhoto = document.querySelector('.popup_id_photo');
const editProfileFormValidate = new FormValidation(validationConfig, validationConfig.formSelector);
const addCardFormValidate = new FormValidation(validationConfig, validationConfig.formSelector);
const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);

function openPopup(item) {
  item.classList.add('popup_visible');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(item) {
  item.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupByEsc);
  if (item === popupEdit || item === popupAdd) {
    newValidation.resetForm(item);
  }
}

function openPopupProfile() {
  openPopup(popupEdit);
  inputUserProfession.value = userProfession.textContent;
  inputUserName.value = userName.textContent;
}

openEditProfileButton.addEventListener('click', openPopupProfile);

closeButtonEdit.addEventListener('click', function() {
  closePopup(popupEdit);
  newValidation.resetForm(popupEdit);
});
popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupEdit);
  }
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userProfession.textContent = inputUserProfession.value;
  closePopup(popupEdit);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);

//форма для добавления карточек открывается и закрывается

addPhoto.addEventListener('click', function() {
  openPopup(popupAdd);
});
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
closeButtonAdd.addEventListener('click', function() {
  closePopup(popupAdd);
});
popupAdd.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupAdd);
  }
});

// Закрываем попап через Esc

function closePopupByEsc (evt) {             
  if (evt.key==='Escape') {
    const popupVisible = document.querySelector('.popup_visible');
    closePopup(popupVisible);
    if (popupVisible === popupAdd || popupVisible === popupEdit) {
      newValidation.resetForm(popupVisible);
    }
   }
}

//добавление карточек

formAddCard.addEventListener('submit', () => {
  const cardData = {
    name: cardConfig.popupAddInputName.value,
    link: cardConfig.popupAddInputLink.value,
    alt: cardConfig.popupAddInputAlt.value,
  }
  const card = new Card(cardData, '.elements__template');
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(popupAdd);
});

editProfileFormValidate.enableValidation(validationConfig);
addCardFormValidate.enableValidation(validationConfig);

//добавление оригинальных карточек

initialCards.forEach(function(item) {
  const card = new Card(item, '.elements__template');
  const cardElement = card.createCard();
  document.querySelector('.elements').append(cardElement);
});