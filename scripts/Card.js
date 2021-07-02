export default class Card {
  constructor(data, config) {
    this._elements = config.elements,
    this._template = config.template,
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

  /*_setButtonEventListeners = () => {
    const likeButton = this._element.querySelector(this._likeButton);
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(this._likeButtonActive);
    });
    const deleteButton = this._element.querySelector(this._deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteButton.closest(this._appendElement).remove();
      });
    }*/

  _createTemplate = () => {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector(this._appendElement)
      .cloneNode(true);
    return cardElement;
  }

  _openPopup = (item) => {
    item.classList.add('popup_visible');
    document.addEventListener('keydown', this._closePopupByEsc);
  }

  _closePopup = (item) => {
    item.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._closePopupByEsc);
  }

  _closePopupByEsc = (evt) => {
    if (evt.key==='Escape') {
      const popupVisible = document.querySelector('.popup_visible');
      this._closePopup(popupVisible);
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
    item.addEventListener('click', () => {this._createPhoto(photoElement)});
    item.addEventListener('click', () => {this._createText(textElement)});
    item.addEventListener('click', () => {this._openPopup(this._popupPhotoElement)});
  }

  createCard = () => {
    this._element = this._createTemplate();
    const cardPhotoElement = this._element.querySelector(this._cardImage);
    const cardTextElement = this._element.querySelector(this._cardText);
    cardPhotoElement.src = this._image; 
    cardTextElement.textContent = this._text; 
    cardPhotoElement.alt = this._alt; 
    //открытие попапа с карточкой
    /*const popupPhotoImage = document.querySelector('.popup__photo-image');
    const popupPhotoCaption = document.querySelector('.popup__photo-caption'); 
    this._element.querySelector(this._cardImage).addEventListener('click', () => {
      popupPhotoImage.src = this._image;
      popupPhotoImage.alt = this._text;
      popupPhotoCaption.textContent = this._text;
      this._openPopup(this._popupPhotoElement);  });*/
    const clickPhoto = this._element.querySelector(this._cardImage);
    this._setEventListeners(clickPhoto, cardPhotoElement, cardTextElement);
    

    const closePhotoButton = this._popupPhotoElement.querySelector('.popup__close-button');
    closePhotoButton.addEventListener('click', () => this._closePopup(this._popupPhotoElement));
    this._popupPhotoElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
      this._closePopup(this._popupPhotoElement);
    }
  });

    return this._element;
    }
}