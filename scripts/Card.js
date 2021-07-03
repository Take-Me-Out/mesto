import { closePopup, openPopup, closePopupPhoto, openPopupPhoto } from "./index.js";
export default class Card {
  constructor(data, template) {
    this._template = template,
    this._popupEdit = data.popupEdit,
    this._inputUserName = data.inputUserName,
    this._inputUserProfession = data.inputUserProfession,
    this._userProfession = data.userProfession,
    this._userName = data.userName,
    this._opeEditProfileButton = data.opeEditProfileButton,
    this._closeButton = data.closeButton,
    this._popup = data.popup,
    this._formAddCard = data.formAddCard,
    this._popupAddInputLink = data.popupAddInputLink,
    this._popupAddInputName = data.popupAddInputName,
    this._popupAddInputAlt = data.popupAddInputAlt,
    this._popupVisible = data.popupVisible,
    this._popupVisibleToggle = data.popupVisibleToggle,
    this._image = data.link, 
    this._text = data.name, 
    this.alt = data.alt
  }

  _createTemplate = () => {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  /*_openPopup = (item) => {
    item.classList.add('popup_visible');
    document.addEventListener('keydown', this._closePopupByEsc);
  }

  _closePopup = (item) => {
    item.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._closePopupByEsc);
  }*/

  _closePopupByEsc = (evt) => {
    if (evt.key==='Escape') {
      const popupVisible = document.querySelector('.popup_visible');
      closePopup(popupVisible);
     }
    }
  
  _createPhoto = (photoElement) => {
    const popupPhotoImage = document.querySelector('.popup__photo-image');
    popupPhotoImage.src = photoElement.src;
    popupPhotoImage.alt = photoElement.alt;
  }

  _createText = (textElement) => {
    const popupPhotoCaption = document.querySelector('.popup__photo-caption');
    popupPhotoCaption.textContent = textElement.textContent;
  }
  
  _setEventListeners = (item, photoElement, textElement) => {
    //const popupPhotoElement = document.querySelector('.popup_id_photo');
    item.addEventListener('click', () => {this._createPhoto(photoElement)});
    item.addEventListener('click', () => {this._createText(textElement)});
    item.addEventListener('click', () => {openPopupPhoto()});
  }

  createCard = () => {
    this._element = this._createTemplate();
    const cardPhotoElement = this._element.querySelector('.element__photo');
    const cardTextElement = this._element.querySelector('.element__city');
    cardPhotoElement.src = this._image; 
    cardTextElement.textContent = this._text; 
    cardPhotoElement.alt = this._alt; 
    //открытие попапа с карточкой
    const clickPhoto = this._element.querySelector('.element__photo');
    this._setEventListeners(clickPhoto, cardPhotoElement, cardTextElement);
    

    const popupPhotoElement = document.querySelector('.popup_id_photo');
    const closePhotoButton = popupPhotoElement.querySelector('.popup__close-button');
    closePhotoButton.addEventListener('click', () => closePopupPhoto());
    popupPhotoElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopupPhoto();
    }
  });

    return this._element;
    }
}