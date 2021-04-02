//загрузка начальных карточек
const initialCards = [
  {
    name: 'Краснодар',
    link: 'https://images.unsplash.com/photo-1563221923-d90d0a7dcf89?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
    alt: 'Фотография из Краснодарской области. Цветущие поля с подсолнухами'
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


initialCards.forEach(function (item) {
  const galleryTemplateClone = galleryTemplate.cloneNode(true);
  galleryTemplateClone.querySelector('.element__city').textContent = item.name;
  galleryTemplateClone.querySelector('.element__photo').src = item.link;
  galleryTemplateClone.querySelector('.element__photo').alt = item.alt;
  elements.append(galleryTemplateClone);
})

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

//пользователь добавляет новые карточки

const addPhoto = document.querySelector('profile__add-photo-button');
addPhoto.addEventListener.apply('click', ) //ДОПИСАТЬ Ф-Ю ОТКРЫТИЯ ПОПАПА
