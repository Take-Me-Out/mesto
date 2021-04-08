//загрузка начальных карточек
const initialCards = [
  {
    name: 'Краснодар',
    link: 'https://images.unsplash.com/photo-1563221923-d90d0a7dcf89?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
    alt: 'Цветущие поля с подсолнухами в Краснодарской области'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография из Челябинской области'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
    alt: 'Фотография Москва-Сити'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография с Камчатки'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1602162993087-cbc22b61816e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
    alt: 'Фотография из Карелии'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография Байкала'
  }
]; 

const galleryTemplate = document.querySelector('.elements__template').content;
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_id_photo');

initialCards.forEach(function (item) {
  const galleryTemplateClone = galleryTemplate.cloneNode(true);
  galleryTemplateClone.querySelector('.element__city').textContent = item.name;
  galleryTemplateClone.querySelector('.element__photo').src = item.link;
  galleryTemplateClone.querySelector('.element__photo').alt = item.alt;
  const initialLike = galleryTemplateClone.querySelector('.element__like-button');
  const deleteButton = galleryTemplateClone.querySelector('.element__delete-button');
  const cardImage = galleryTemplateClone.querySelector('.element__photo');
  elements.append(galleryTemplateClone);
  deleteButton.addEventListener('click', function() {
    deleteButton.parentElement.remove();
  })
  initialLike.addEventListener('click', function() {
    initialLike.classList.toggle('element__like-button_active');
  });
  cardImage.addEventListener('click', function() {
    const popupTemplate = popupPhoto.querySelector('.popup__photo-template').content;
    const popupTemplateClone = popupTemplate.cloneNode(true);
    popupTemplateClone.querySelector('.popup__photo-image').name = cardImage.name;
    popupTemplateClone.querySelector('.popup__photo-image').alt = cardImage.alt;
    popupTemplateClone.querySelector('.popup__photo-image').src = cardImage.src;
    const popupTemplateImage = popupTemplateClone.querySelector('.popup__photo-image');
    const closePhotoButton = popupTemplateClone.querySelector('.popup__close-button');
    const caption = popupTemplateClone.querySelector('.popup__photo-caption');
    caption.textContent = popupTemplateClone.querySelector('.popup__photo-image').alt;
    popupPhoto.append(popupTemplateClone);
    popupPhoto.classList.add('popup_visible');
    function closePopup() {
      popupPhoto.classList.remove('popup_visible');
      popupTemplateImage.parentElement.remove();
    }
    closePhotoButton.addEventListener('click', closePopup);
  });
});

//пользователь редактирует профиль

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

function close(item) {
  item.classList.remove('popup_visible');
}

let closeButtonEdit = popup.querySelector('.popup__close-button');
function closePopup() {
  popup.classList.remove('popup_visible');
}
closeButtonEdit.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup-form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  surname.textContent = oldName.value;
  information.textContent = oldInformation.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

//форма для добавления карточек открывается и закрывается

const popupAdd = document.querySelector('.popup_id_add-card');
function openPopupAddCards() {
  popupAdd.classList.add('popup_visible');
}

const addPhoto = document.querySelector('.profile__add-photo-button');
addPhoto.addEventListener('click', openPopupAddCards);
let closeButtonAdd = popupAdd.querySelector('.popup__close-button');
function closePopupAdd() {
  popupAdd.classList.remove('popup_visible');
}
closeButtonAdd.addEventListener('click', closePopupAdd);

//добавление карточек
const addButton = popupAdd.querySelector('.popup-form');

function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: `${popupAdd.querySelector('.popup-form__input_id_place').value}`,
    link: `${popupAdd.querySelector('.popup-form__input_id_link').value}`,
    alt: `${popupAdd.querySelector('.popup-form__input_id_place').value}`
  }
  const galleryTemplateClone = galleryTemplate.cloneNode(true);
  galleryTemplateClone.querySelector('.element__city').textContent = cardData.name;
  galleryTemplateClone.querySelector('.element__photo').src = cardData.link;
  galleryTemplateClone.querySelector('.element__photo').alt = cardData.alt;
  const likeButton = galleryTemplateClone.querySelector('.element__like-button');
  const deleteButton = galleryTemplateClone.querySelector('.element__delete-button');
  const cardImage = galleryTemplateClone.querySelector('.element__photo');
  elements.prepend(galleryTemplateClone);
  closePopupAdd();
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
  })
  deleteButton.addEventListener('click', function() {
    deleteButton.parentElement.remove();
  })
  cardImage.addEventListener('click', function() {
    const popupTemplate = popupPhoto.querySelector('.popup__photo-template').content;
    const popupTemplateClone = popupTemplate.cloneNode(true);
    popupTemplateClone.querySelector('.popup__photo-image').name = cardImage.name;
    popupTemplateClone.querySelector('.popup__photo-image').alt = cardImage.alt;
    popupTemplateClone.querySelector('.popup__photo-image').src = cardImage.src;
    const popupTemplateImage = popupTemplateClone.querySelector('.popup__photo-image');
    const closePhotoButton = popupTemplateClone.querySelector('.popup__close-button');
    const caption = popupTemplateClone.querySelector('.popup__photo-caption');
    caption.textContent = popupTemplateClone.querySelector('.popup__photo-image').alt;
    popupPhoto.append(popupTemplateClone);
    popupPhoto.classList.add('popup_visible');
    function closePopup() {
      popupPhoto.classList.remove('popup_visible');
      popupTemplateImage.parentElement.remove();
    }
    closePhotoButton.addEventListener('click', closePopup);})
  }

addButton.addEventListener('submit', addCard)