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

const cardList = document.querySelector(".cards__list");

initialCards.forEach((cardObj) => {
    const card = getCardElement(cardObj);
    cardList.appendChild(card);
});

function getCardElement(data) {
    // select card <li> from template 
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);

    // image src and alt 
    const cardImage = card.querySelector(".card__image");
    cardImage.setAttribute("src", data.link);
    cardImage.setAttribute("alt", `Photo of ${data.name}`);

    // h2 location text
    const cardDescription = card.querySelector(".card__description");
    cardDescription.querySelector(".card__title").textContent = data.name; 
  
    return card;
}
  

/*--------------------------------------------------------------*/
/*                       Elements                               */
/*--------------------------------------------------------------*/

// const profileEditButton = document.querySelector("#profile-edit-button");
//const profileEditButton = document.querySelector(".profile__edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
// const profileName = document.querySelector(".profile__title js-pro");

// profileEditButton.addEventListener("click", () => {
//     profileEditModal.classList.add("modal_opened");
// });

// profileEditCloseButton.addEventListener("click", () => {
//     profileEditModal.classList.remove("modal_opened");
// });
