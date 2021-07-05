import { closePopup, openPopup } from "./index.js";
export default class Card {
  constructor(data, template) {
    this._template = template,
    this._image = data.link, 
    this._text = data.name
  }

  _createTemplate = () => {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeButton = () => {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteButton = () => {
    const deleteButton = this._element.querySelector('.element__delete-button');
    deleteButton.closest('.element').remove();
  }
    

  _createPhotoPreview = (photoElement, textElement, modal) => {
    const popupPhotoImage = document.querySelector('.popup__photo-image');
    popupPhotoImage.src = photoElement.src;
    popupPhotoImage.alt = photoElement.alt;
    const popupPhotoCaption = document.querySelector('.popup__photo-caption');
    popupPhotoCaption.textContent = textElement.textContent;
    openPopup(modal);
  }
  
  _setEventListeners = (photoElement, textElement, modal) => {
    this._element.querySelector('.element__photo').addEventListener('click', () => {this._createPhotoPreview(photoElement, textElement, modal)});
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButton()
      });
  }

  createCard = () => {
    this._element = this._createTemplate();
    const cardPhotoElement = this._element.querySelector('.element__photo');
    const cardTextElement = this._element.querySelector('.element__city');
    cardPhotoElement.src = this._image; 
    cardTextElement.textContent = this._text; 
    cardPhotoElement.alt = this._alt; 
    //открытие попапа с карточкой
 
    const popupPhotoElement = document.querySelector('.popup_id_photo');
    this._setEventListeners(cardPhotoElement, cardTextElement, popupPhotoElement);
    
    const closePhotoButton = popupPhotoElement.querySelector('.popup__close-button');
    closePhotoButton.addEventListener('click', () => closePopup(popupPhotoElement));
    popupPhotoElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popupPhotoElement);
    }
  });

  return this._element;
  }
}