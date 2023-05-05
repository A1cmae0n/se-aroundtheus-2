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
/*--------------------------------------------------------------*/
/*                       Elements                               */
/*--------------------------------------------------------------*/
const cardList = document.querySelector(".cards__list");

const editProfileForm = document.querySelector("#editProfile"); 
const newLocationForm = document.querySelector("#newLocation"); 

const profileName = document.querySelector(".profile__title");
const profileJob =  document.querySelector(".profile__description");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// const profileEditSaveButton = document.querySelector(".modal__save-button");
// fields in the edit profile form
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("description");

const newLocation = document.getElementById("new-location");
const newImageUrl = document.getElementById("new-image");

const modalCloseButton = document.querySelector(".modal__close-button");

populateCards();
populateEditForm();

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newLocationForm.addEventListener('submit', handleNewLocationSubmit);

// connect the handler to the form to watch the submit event

profileEditButton.addEventListener("click", () => {
    // profileEditModal.classList.add("modal_opened");
    const modal = document.querySelector(".modal__edit-profile");
    modal.classList.add("modal__opened");
    addModalCloseButtonEvent("#modal__edit-profile-close"); 
});

profileAddButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal__new-location");
    modal.classList.add("modal__opened");
    addModalCloseButtonEvent("#modal__new-location-close");   
});

/*--------------------------------------------------------------*/
/*                       Methods                               */
/*--------------------------------------------------------------*/
function populateCards() {
    initialCards.forEach((cardObj) => {
        const card = getCardElement(cardObj);
        cardList.appendChild(card);
    });    
}

function getCardElement(data) {
    // Get card template 
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);

    loadCardImage(card, data);
    loadLocationData(card, data);
    clickLikeButton(card);
    trashCan(card);

    return card;
}

// add functionality to like button
function clickLikeButton(card) {
    const likeButton = card.querySelector(".card__like-button");
    likeButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        // if it is clicked (and black) we remove that style
        // otherwise, we add that style
        if (likeButton.classList.contains("card__like-button-clicked")) {
            likeButton.classList.remove("card__like-button-clicked");
        } else {
            likeButton.classList.add("card__like-button-clicked");
        }
    });
}

// Fill w/ image src and alt 
function loadCardImage(card, data) {
    const cardImage = card.querySelector(".card__image");
    cardImage.setAttribute("src", data.link);
    cardImage.setAttribute("alt", `Photo of ${data.name}`);
}

// Fill h2 w/ location text
function loadLocationData(card, data) {
    const cardDescription = card.querySelector(".card__description");
    cardDescription.querySelector(".card__title").textContent = data.name; 
}

// add event listener to trash lid/bin to remove card
function trashCan(card) {
    const trashLid = card.querySelector(".card__trash-lid");
    const trashBin = card.querySelector(".card__trash-bin"); 

    trashBin.addEventListener("click", (evt) => {
        evt.target.closest(".card").remove()
    }); 
    
    trashLid.addEventListener("click", (evt) => {
        evt.target.closest(".card").remove()
    }); 
}

function populateEditForm() {
    // Fill out default values for editProfile popup
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
}

// the form submission handler.
function handleEditProfileSubmit(evt) {
// function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    // get the values of each field from the value property 
    // of the corresponding input element
    const newUserName = nameInput.value;
    const newUserDescription = jobInput.value;
    // insert new values into the textContent property of the 
    // corresponding profile elements
    profileName.textContent = newUserName;
    profileJob.textContent = newUserDescription;

    const modal = evt.target.closest('.modal');
    modal.classList.remove("modal__opened");
}

function handleNewLocationSubmit(evt) {
    evt.preventDefault();

    const location = newLocation.value;
    const url = newImageUrl.value;

    const data = {
        name: newLocation.value,
        link: newImageUrl.value
    }

    const newCard = getCardElement(data);
    cardList.prepend(newCard);

    const modal = evt.target.closest('.modal');
    modal.classList.remove("modal__opened");q
}


function addModalCloseButtonEvent(closeButtonId) {
    const closeButton = document.querySelector(closeButtonId);
    closeButton.addEventListener("click", () => {
        closeButton.closest(".modal").classList.remove("modal__opened");
    });   
}

