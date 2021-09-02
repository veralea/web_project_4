let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');

function changePopup(){
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', changePopup);
closeButton.addEventListener('click', changePopup);

let formElement = page.querySelector('.popup__container');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = page.querySelector('input[name="name"]');
  let jobInput = page.querySelector('input[name="job"]')

  let name = nameInput.value;
  let job = jobInput.value;

  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__job').textContent = job;
}

formElement.addEventListener('submit', handleFormSubmit);


