const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
];

// Populate page with cards
const cardList = document.querySelector(".cards__list");

initialCards.forEach((cardObj) => {
    const card = getCardElement(cardObj);
    cardList.appendChild(card);
});

function getCardElement(data) {
    // Get card template 
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);

    // Fill w/ image src and alt 
    const cardImage = card.querySelector(".card__image");
    cardImage.setAttribute("src", data.link);
    cardImage.setAttribute("alt", `Photo of ${data.name}`);

    // Fill h2 w/ location text
    const cardDescription = card.querySelector(".card__description");
    cardDescription.querySelector(".card__title").textContent = data.name; 
  
    return card;
}
// END Populate 


/*--------------------------------------------------------------*/
/*                       Elements                               */
/*--------------------------------------------------------------*/

const modalCloseButton = document.querySelector(".modal__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileEditSaveButton = document.querySelector(".modal__edit-save-button");
/*--------------------------------------------------------------*/
/*                       Methods                               */
/*--------------------------------------------------------------*/

// find the form in the DOM
const formElement = document.querySelector(".modal__form");

// find the form fields in the DOM
const nameInput = document.querySelector(".modal__title-edit ");
const jobInput = document.querySelector(".modal__description-edit ");

// find the profile elements in the DOM
const profileName = document.querySelector(".profile__title");
const profileJob =  document.querySelector(".profile__description");

// Fill out default values
nameInput.value = profileName.innerText;
jobInput.value = profileJob.innerText;

// the form submission handler.
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    // get the values of each field from the value property 
    // of the corresponding input element
    const newUserName = nameInput.value;
    const newUserDescription = jobInput.value;
    // insert new values into the textContent property of the 
    // corresponding profile elements
    profileName.textContent = newUserName;
    profileJob.textContent = newUserDescription;
}

// connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); 

profileEditButton.addEventListener("click", () => {
    // profileEditModal.classList.add("modal_opened");
    const modal = document.querySelector(".modal")
    modal.classList.add("modal__opened");
});

profileAddButton.addEventListener("click", () => {

});

modalCloseButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal__opened");
});

// profileEditCloseButton.addEventListener("click", () => {
//     profileEditModal.classList.remove("modal_opened");
// });
