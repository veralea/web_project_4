const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const closeButtons = page.querySelectorAll('.popup__close-button');
const editForm = page.querySelector('.popup__form_type_edit');
const addForm = page.querySelector('.popup__form_type_add');
const cardsGrid = page.querySelector('.cards-grid');
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function deleteCard(evt) {
  evt.closest('.card').remove();
}

function openImg (evt, name, link) {
  let popupImg = page.querySelector('.popup_type_img');
  let popupContainer = popupImg.querySelector('.popup__container');
  popupImg.classList.add('popup_opened');
  let img = document.createElement("img");
  img.setAttribute('class','popup__image');
  img.setAttribute('src',link);
  let caption = document.createElement('p');
  caption.setAttribute('class','popup__caption');
  caption.textContent = name;
  popupContainer.append(img,caption);
}

function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const picture = card.querySelector('.card__picture');

  picture.setAttribute('src', link);
  picture.setAttribute('alt', name);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__like-button").addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_state_active');
  });
  card.querySelector('.card__delete-button').addEventListener('click', (e)=>deleteCard(e.target));
  picture.addEventListener('click',(e)=>openImg(e,name,link));
  cardsGrid.prepend(card);
}
initialCards.reverse();
initialCards.forEach(initialCard => addCard(initialCard.link,initialCard.name));


function openPopup(evt, popup){
  evt.preventDefault();

  popup.classList.add('popup_opened');
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = page.querySelector('input[name="name"]');
  let jobInput = page.querySelector('input[name="job"]')

  let name = nameInput.value;
  let job = jobInput.value;

  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__job').textContent = job;

  closePopup(evt,evt.target.closest('.popup'));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  let title = page.querySelector('input[name="title"]').value;
  let link = page.querySelector('input[name="link"]').value;

  closePopup(evt,evt.target.closest('.popup'));
  addCard(link, title);
}

function closePopup(evt,popup) {
  evt.preventDefault();
  let classListValue = popup.classList.value;
  popup.classList.add('popup_disappear');
  setTimeout(()=>{
    if(classListValue.includes('img')){
      popup.querySelector('img').remove();
      popup.querySelector('p').remove();
    }

    popup.classList.remove('popup_opened');
    popup.classList.remove('popup_disappear');
  },1000);

}


editForm.addEventListener('submit', handleEditProfileFormSubmit);
addForm.addEventListener('submit', handleAddCardFormSubmit);
editButton.addEventListener('click', (e)=>openPopup(e,page.querySelector('.popup_type_edit')));
addButton.addEventListener('click', (e)=>openPopup(e,page.querySelector('.popup_type_add')));
Array.from(closeButtons).forEach(closeButton => {
  closeButton.addEventListener('click', (e)=>closePopup(e,e.target.closest('.popup')));
});

