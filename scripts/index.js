import { FormValidation, validationConfig } from './validate.js';
import {initialCards} from './initial-сards.js';

const cardConfig = {
  elements: document.querySelector('.elements'),
  element: '.element',
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

/*const galleryTemplate = document.querySelector('.elements__template').content;
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_id_photo');
const popupPhotoImage = document.querySelector('.popup__photo-image');
const popupPhotoCaption = document.querySelector('.popup__photo-caption');
const closePhotoButton = popupPhoto.querySelector('.popup__close-button');

//пользователь редактирует профиль
*/
const userName = document.querySelector(cardConfig.userName);
const userProfession = document.querySelector(cardConfig.userProfession);
const inputUserName = document.querySelector(cardConfig.inputUserName);
const inputUserProfession = document.querySelector(cardConfig.inputUserProfession);

const popupEdit = document.querySelector('.popup_id_edit-profile');

function openPopup(item) {
  item.classList.add('popup_visible');
  document.addEventListener('keydown', closePopupByEsc);
}
function closePopup(item) {
  item.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupByEsc);
}
function openPopupProfile() {
  openPopup(popupEdit);
  inputUserProfession.value = userProfession.textContent;
  inputUserName.value = userName.textContent;
}
const openEditProfileButton = document.querySelector('.profile__edit-button');
openEditProfileButton.addEventListener('click', openPopupProfile);

const closeButtonEdit = document.querySelector('.popup__close-button');
closeButtonEdit.addEventListener('click', function() {
  closePopup(popupEdit);
  const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
  newValidation.resetForm(popupEdit, validationConfig);
});
popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupEdit);
    const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
    newValidation.resetForm(popupEdit, validationConfig);
  }
});

const formEditProfile = document.querySelector('.popup-form_id_edit-profile');
function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userProfession.textContent = inputUserProfession.value;
  closePopup(popupEdit);
  const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
  newValidation.resetForm(popupEdit, validationConfig);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);

//форма для добавления карточек открывается и закрывается

const popupAdd = document.querySelector('.popup_id_add-card');
const addPhoto = document.querySelector('.profile__add-photo-button');
addPhoto.addEventListener('click', function() {
  openPopup(popupAdd);
});
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
closeButtonAdd.addEventListener('click', function() {
  closePopup(popupAdd);
  const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
  newValidation.resetForm(popupAdd, validationConfig);
});
popupAdd.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupAdd);
    const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
    newValidation.resetForm(popupAdd, validationConfig);
  }
});

// Закрываем попап через Esc

function closePopupByEsc (evt) {
  if (evt.key==='Escape') {
    const popupVisible = document.querySelector('.popup_visible');
    closePopup(popupVisible);
   }
  }
/*
//добавление карточек
const formAddCard = popupAdd.querySelector('.popup-form_id_add-card');
const inputLink = popupAdd.querySelector('.popup-form__input_id_link').value;

function createCard(data) {
  const galleryTemplateClone = galleryTemplate.cloneNode(true);
  const cardImage = galleryTemplateClone.querySelector('.element__photo');
  const cardText = galleryTemplateClone.querySelector('.element__city');
  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  
  const likeButton = galleryTemplateClone.querySelector('.element__like-button');
  const deleteButton = galleryTemplateClone.querySelector('.element__delete-button');

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like-button_active');
  })
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  })

  cardImage.addEventListener('click', function() {
    popupPhotoImage.src = data.link;
    popupPhotoImage.alt = data.alt;
    popupPhotoCaption.textContent = data.name;
    openPopup(popupPhoto);
  })
  
  return galleryTemplateClone;
}

closePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
popupPhoto.addEventListener('click', (evt) => {
 if (evt.target.classList.contains('popup')) {
    closePopup(popupPhoto);
  }
});


const popupAddInputLink = popupAdd.querySelector('.popup-form__input_id_link');
const popupAddInputName = popupAdd.querySelector('.popup-form__input_id_place');
const popupAddInputAlt = popupAdd.querySelector('.popup-form__input_id_place');

function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: `${popupAddInputName.value}`,
    link: `${popupAddInputLink.value}`,
    alt: `${popupAddInputAlt.value}`,
  }
  const galleryTemplateClone = createCard(cardData);
  elements.prepend(galleryTemplateClone);
  closePopup(popupAdd);
  resetForm(popupAdd, validationConfig);
}

formAddCard.addEventListener('submit', addCard);
*/

//Классы

class Card {
  constructor(data, config) {
    this._elements = config.elements,
    this._appendElement = config.element,
    this._galleryTemplate = config.galleryTemplate,
    this._popupPhoto = config.popupPhoto,
    this._popupPhotoElement = config.popupPhotoElement,
    this._popupPhotoImage = config.popupPhotoImage,
    this._popupPhotoCaption = config.popupPhotoCaption,
    this._popupEdit = data.popupEdit,
    this._inputUserName = data.inputUserName,
    this._inputUserProfession = data.inputUserProfession,
    this._userProfession = data.userProfession,
    this._userName = data.userName,
    this._opeEditProfileButton = data.opeEditProfileButton,
    this._closeButton = data.closeButton,
    this._popup = data.popup,
    this._formAddCard = data.formAddCard
    this._cardImage = config.cardImage,
    this._cardText = config.cardText,
    this._deleteButton = config.deleteButton,
    this._likeButton = config.likeButton,
    this._likeButtonActive = config.likeButtonActive,
    this._popupAddInputLink = data.popupAddInputLink,
    this._popupAddInputName = data.popupAddInputName,
    this._popupAddInputAlt = data.popupAddInputAlt,
    this._popupVisible = data.popupVisible,
    this._popupVisibleToggle = data.popupVisibleToggle,
    this._image = data.link, 
    this._text = data.name, 
    this.alt = data.alt
  }

  _setButtonEventListeners = () => {
    const likeButton = this._element.querySelector(this._likeButton);
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(this._likeButtonActive);
    });
    const deleteButton = this._element.querySelector(this._deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteButton.closest(this._appendElement).remove();
      });
    }

  _createTemplate = () => {
    const cardElement = document
      .querySelector('.elements__template')
      .content
      .querySelector(this._appendElement)
      .cloneNode(true);
    return cardElement;
  }

  createCard = () => {
    this._element = this._createTemplate();
    this._element.querySelector(this._cardImage).src = this._image; 
    this._element.querySelector(this._cardText).textContent = this._text; 
    this._element.querySelector(this._cardImage).alt = this._alt; 
    this._setButtonEventListeners();
    //открытие попапа с карточкой
    const popupPhotoImage = document.querySelector('.popup__photo-image');
    const popupPhotoCaption = document.querySelector('.popup__photo-caption'); 
    this._element.querySelector(this._cardImage).addEventListener('click', () => {
      popupPhotoImage.src = this._image;
      popupPhotoImage.alt = this._text;
      popupPhotoCaption.textContent = this._text;
      openPopup(this._popupPhotoElement);
    });

    const closePhotoButton = this._popupPhotoElement.querySelector('.popup__close-button');
    closePhotoButton.addEventListener('click', () => closePopup(this._popupPhotoElement));
    this._popupPhotoElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
      closePopup(this._popupPhotoElement);
    }
  });

    return this._element;
    }
}

initialCards.forEach(function(item) {
  const card = new Card(item, cardConfig);
  const cardElement = card.createCard();
  document.querySelector('.elements').append(cardElement);
});

const formAddCard = popupAdd.querySelector(cardConfig.formAddCard);
formAddCard.addEventListener('submit', () => {
  const cardData = {
    name: `${cardConfig.popupAddInputName.value}`,
    link: `${cardConfig.popupAddInputLink.value}`,
    alt: `${cardConfig.popupAddInputAlt.value}`,
  }
  const card = new Card(cardData, cardConfig);
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(popupAdd);
  const newValidation = new FormValidation(validationConfig, validationConfig.formSelector);
  newValidation.resetForm(popupAdd, validationConfig);
});