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
  const cardText = galleryTemplateClone.querySelector('.element__city');
  elements.append(galleryTemplateClone);
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  })
  initialLike.addEventListener('click', function() {
    initialLike.classList.toggle('element__like-button_active');
  });

  const popupPhotoImage = document.querySelector('.popup__photo-image');
  const popupPhotoCaption = document.querySelector('.popup__photo-caption');
  const closePhotoButton = popupPhoto.querySelector('.popup__close-button');
  cardImage.addEventListener('click', function() {
    popupPhotoImage.src = cardImage.src;
    popupPhotoImage.alt = cardImage.alt;
    popupPhotoCaption.textContent = cardText.textContent;
    popupPhoto.classList.add('popup_visible');
    function closePopup() {
      popupPhoto.classList.remove('popup_visible');
      popupPhotoImage.src = "";
      popupPhotoImage.alt = "";
      popupPhotoCaption.textContent = "";
    }
  closePhotoButton.addEventListener('click', closePopup);
  });
});

//пользователь редактирует профиль

const surname = document.querySelector('.profile__name');
const information = document.querySelector('.profile__information');
const oldName = document.querySelector('.popup-form__input_id_name');
const oldInformation = document.querySelector('.popup-form__input_id_information');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_id_edit-profile');
function openPopup(item) {
  item.classList.add('popup_visible');
}
function openPopupProfile() {
  /*popup.classList.add('popup_visible');*/
  openPopup(popupEdit);
  oldInformation.textContent = information.textContent;
  oldName.textContent = surname.textContent;
}
const edit = document.querySelector('.profile__edit-button');
edit.addEventListener('click', openPopupProfile);

const closeButtonEdit = popup.querySelector('.popup__close-button');
function closePopup() {
  popup.classList.remove('popup_visible');
}
closeButtonEdit.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup-form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  surname.textContent = oldName.value;
  information.textContent = oldInformation.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

//форма для добавления карточек открывается и закрывается

const popupAdd = document.querySelector('.popup_id_add-card');
const addPhoto = document.querySelector('.profile__add-photo-button');
addPhoto.addEventListener('click', function() {
  openPopup(popupAdd)
});
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
function closePopupAdd() {
  popupAdd.classList.remove('popup_visible');
}
closeButtonAdd.addEventListener('click', closePopupAdd);

//добавление карточек
const addButton = popupAdd.querySelector('.popup-form');

const cardData = {
  name: `${popupAdd.querySelector('.popup-form__input_id_place').value}`,
  link: `${popupAdd.querySelector('.popup-form__input_id_link').value}`,
  alt: `${popupAdd.querySelector('.popup-form__input_id_place').value}`
}

function createCard(data) {
  const galleryTemplateClone = galleryTemplate.cloneNode(true);
  galleryTemplateClone.querySelector('.element__city').textContent = data.name;
  galleryTemplateClone.querySelector('.element__photo').src = data.link;
  galleryTemplateClone.querySelector('.element__photo').alt = data.name;
  return galleryTemplateClone;
}

const galleryTemplateClone = createCard(cardData);

function addCard(evt) {
  evt.preventDefault();
  const likeButton = galleryTemplateClone.querySelector('.element__like-button');
  const deleteButton = galleryTemplateClone.querySelector('.element__delete-button');
  const cardImage = galleryTemplateClone.querySelector('.element__photo');
  const cardText = galleryTemplateClone.querySelector('.element__city');
  elements.prepend(galleryTemplateClone);
  closePopupAdd();
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
  })
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  })

  const popupPhotoImage = document.querySelector('.popup__photo-image');
  const popupPhotoCaption = document.querySelector('.popup__photo-caption');
  const closePhotoButton = popupPhoto.querySelector('.popup__close-button');
  cardImage.addEventListener('click', function() {
    popupPhotoImage.src = cardImage.src;
    popupPhotoImage.alt = cardImage.alt;
    popupPhotoCaption.textContent = cardText.textContent;
    /*popupPhoto.classList.add('popup_visible');*/
    openPopup(popupPhoto);
    function closePopup() {
      popupPhoto.classList.remove('popup_visible');
      popupPhotoImage.src = "";
      popupPhotoImage.alt = "";
      popupPhotoCaption.textContent = "";
    }
  closePhotoButton.addEventListener('click', closePopup);
    })
  }

addButton.addEventListener('submit', addCard)