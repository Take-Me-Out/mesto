const galleryTemplate = document.querySelector('.elements__template').content;
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_id_photo');
const popupPhotoImage = document.querySelector('.popup__photo-image');
const popupPhotoCaption = document.querySelector('.popup__photo-caption');
const closePhotoButton = popupPhoto.querySelector('.popup__close-button');

initialCards.forEach(function (item) {
  const galleryTemplateClone = createCard(item);
  elements.append(galleryTemplateClone);
});

//пользователь редактирует профиль

const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__information');
const inputUserName = document.querySelector('.popup-form__input_id_name');
const inputUserProfession = document.querySelector('.popup-form__input_id_information');

const popupEdit = document.querySelector('.popup_id_edit-profile');
function openPopup(item) {
  item.classList.add('popup_visible');
  enableValidation(validationConfig);
  document.addEventListener('keydown', closePopupByEsc);
}
function closePopup(item) {
  item.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupByEsc);
  if (item.classList.contains('popup_id_edit-profile') || (item.classList.contains('popup_id_add-card'))) {
    const closeForm = item.querySelector('.popup-form');
    closeForm.reset();
    const errorList = Array.from(closeForm.querySelectorAll('.popup-form__input-error_active'));
    errorList.forEach((errorElement) => {
      errorElement.classList.remove('popup-form__input-error_active');
        })
  }
}
function openPopupProfile() {
  openPopup(popupEdit);
  inputUserProfession.value = userProfession.textContent;
  inputUserName.value = userName.textContent;
}
const edit = document.querySelector('.profile__edit-button');
edit.addEventListener('click', openPopupProfile);

const closeButtonEdit = document.querySelector('.popup__close-button');
closeButtonEdit.addEventListener('click', function() {
  closePopup(popupEdit)
});
popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupEdit);
  }
});

const formEditProfile = document.querySelector('.popup-form_id_edit-profile');
function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userProfession.textContent = inputUserProfession.value;
  closePopup(popupEdit);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);

//форма для добавления карточек открывается и закрывается

const popupAdd = document.querySelector('.popup_id_add-card');
const addPhoto = document.querySelector('.profile__add-photo-button');
addPhoto.addEventListener('click', function() {
  openPopup(popupAdd)
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
}

formAddCard.addEventListener('submit', addCard)

// Закрываем попап через Esc

 function closePopupByEsc (evt) {
  if (evt.key==='Escape') {
    const popupVisible = document.querySelector('.popup_visible');
    closePopup(popupVisible);
  }
 }
