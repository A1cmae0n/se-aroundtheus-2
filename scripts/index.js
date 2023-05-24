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
const profileAddLocationButton = document.querySelector(".profile__add-location-button");

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("description");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");
const closeImageModal = document.querySelectorAll(".modal__image-close");

const outsideModal = document.querySelectorAll(".modal__blocker");

/*--------------------------------------------------------------*/
/*                       Cards                                  */
/*--------------------------------------------------------------*/
populateCards();

function populateCards() {
    initialCards.forEach((cardObj) => {
        const card = getCardElement(cardObj);
        cardList.appendChild(card);
    });    
}

// Auxiliary method for the above
function getCardElement(data) {
    // Get card template and add event listeners 
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);

    loadCardImage(card, data);
    loadLocationData(card, data);
    clickLikeButton(card);
    trashCan(card);

    return card;
}

// Auxiliary methods 
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

/*--------------------------------------------------------------*/
/*                         Modals                               */
/*--------------------------------------------------------------*/
addCloseButtonEvents();

function addCloseButtonEvents() {
    modalCloseButtons.forEach( closeButton => {
        const modal = closeButton.closest(".modal");
        closeButton.addEventListener("click", () => {
            close(modal);
        });   
    });
    // The image popups have their own close button 
    // The regular modalCloseButtons styles conflict with their formatting
    closeImageModal.forEach((closeButton) => {
        const modal = closeButton.closest(".modal");
        closeButton.addEventListener("click", () => {
            close(modal);
        });   
    });
}

function close(modal) {
    modal.classList.remove("modal__opened");
}

/*--------------------------------------------------------------*/
/*                       Edit Profile Modal                        */
/*--------------------------------------------------------------*/
populateEditForm();
editProfileForm.addEventListener('submit', handleEditProfileSubmit);

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
    // close window on submit
    const modal = evt.target.closest('.modal');
    close(modal);
}

// connect the handler to the form to watch the submit event
profileEditButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal__edit-profile");
    modal.classList.add("modal__opened");
}); 

/*--------------------------------------------------------------*/
/*                    Add Location Modal                        */
/*--------------------------------------------------------------*/
function handleNewLocationSubmit(evt) {
    evt.preventDefault();

    const newLocation = document.getElementById("new-location");
    const newImageUrl = document.getElementById("new-image");

    const data = {
        name: newLocation.value,
        link: newImageUrl.value
    }
    // create & prepend new card 
    const newCard = getCardElement(data);
    cardList.prepend(newCard);

    // close window on submit
    const modal = evt.target.closest('.modal');
    close(modal);
}

profileAddLocationButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal__new-location");
    modal.classList.add("modal__opened");
});

newLocationForm.addEventListener('submit', handleNewLocationSubmit);

/*--------------------------------------------------------------*/
/*                        Images                                */
/*--------------------------------------------------------------*/
addImageEventListeners();

function addImageEventListeners() {
    const images = document.querySelectorAll(".card__image");
    images.forEach(image => {
        const src = image.src;
        image.addEventListener("click", () => {
            renderOpenImageModal(src);
        });
    });
}

function renderOpenImageModal(src) {
    const imageModal = document.querySelector(".modal-image");
    const clickedImage = imageModal.querySelector(".modal__img");
    clickedImage.setAttribute("src", src);
    imageModal.classList.add("modal__opened");
}

closeOutsideClickModal();

function closeOutsideClickModal() {
    outsideModal.forEach( blocker => {
        blocker.addEventListener("click", (evt) => {
            const modal = evt.target.closest('.modal');
            close(modal)
        });
    });
}
