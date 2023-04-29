const initialCards = [
    {
        name: "Yosemite Valley",
        link: ""
    },
    {
        name: "Lake Louise",
        link: ""
    },
    {
        name: "Bald Mountains",
        link: ""
    },
    {
        name: "Latemar",
        link: ""
    },
    {
        name: "Vanoise National Park",
        link: ""
    },
    {
        name: "Lago di Braies",
        link: ""
    }
];

/*--------------------------------------------------------------*/
/*                       Elements                               */
/*--------------------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title js-pro");

profileEditButton.addEventListener("click", () => {
    profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", () => {
    profileEditModal.classList.remove("modal_opened");
});
u8ijh