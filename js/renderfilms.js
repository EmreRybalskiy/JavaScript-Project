import { createModal } from "./modalWindow.js";
export const render = (el, containerName = "main-section") => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const aboutFilm = document.createElement("p");
    const genres = document.createElement("p");
    const rating = document.createElement("p");
    const premieredFilm = document.createElement("p");
    const language = document.createElement("p");
    const filmName = document.createElement("p");
    const mainSection = document.getElementById(containerName);
    div.innerHTML = "";
    if (!el.image) {
        img.setAttribute("src", "images/noimage.png");
    } else if (el.image.original) {
        img.setAttribute("src", el.image.original);
    } else {
        img.setAttribute("src", el.image.medium);
    }
    if (el.rating.average === null) {
        el.rating.average = "";
    }
    premieredFilm.className = "premieredFilm";

    genres.className = "genres";
    filmName.className = "filmName";
    rating.className = "rating";
    language.className = "language";
    div.className = "main-item";
    aboutFilm.className = "film-desc";
    aboutFilm.id = "film-desc";
    rating.className = "rating";

    genres.innerText = `${el.genres}`;
    language.innerText = `${el.language}`;
    rating.innerText = `${el.rating.average}`;
    premieredFilm.innerHTML = `${el.premiered}`;
    filmName.innerHTML = `${el.name}`;

    mainSection.append(div);
    div.appendChild(img);
    div.append(aboutFilm);
    aboutFilm.append(filmName);
    aboutFilm.append(genres);
    aboutFilm.append(language);
    aboutFilm.append(rating);
    aboutFilm.append(premieredFilm);

    const btnFavorite = document.createElement("span");

    aboutFilm.append(btnFavorite);
    btnFavorite.className = "favorite";
    btnFavorite.id = "favorite";
    btnFavorite.addEventListener("click", function (event) {
        if (containerName === "main-section") {
            localStorage.setItem(el.id, JSON.stringify(el));
            btnFavorite.style.transform = "translateY(-40%)";
            btnFavorite.style.borderColor = "black black transparent";
        } else {
            div.remove();
            localStorage.removeItem(el.id);
        }
        event.stopImmediatePropagation();
    });
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key == el.id) {
            btnFavorite.style.transform = "translateY(-40%)";
            btnFavorite.style.borderColor = "black black transparent";
        }
    }
    div.addEventListener("click", function () {
        if (window.innerWidth > 500) {
            createModal(el);
        }
    });
};

export const showFilms = (result) => {
    result.forEach((el) => {
        render(el.show || el);
    });
};
