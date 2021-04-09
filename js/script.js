import { render } from "./renderfilms.js";
import { getFimlsFromServer } from "./fetchfilms.js";
export const mainSection = document.getElementById("main-section");
export let currentPage = 1;
export const filterGenre = document.getElementById("filter-genre");
export const filterLang = document.getElementById("filter-lang");
export const maxElements = 10;
export const inputSearch = document.getElementById("inp-search");
const button = document.getElementById("button");
const quantityFilms = document.getElementById("quantity-films");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const pageList = document.getElementById("page-list");
const currentPageList = document.getElementById("page-lsit_current");
const allPages = 5;

if (document.location.pathname.includes("/favorite.html")) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.getItem(localStorage.key(i));
        if (key) {
            const el = JSON.parse(localStorage.getItem(localStorage.key(i)));
            render(el, "fav-section");
        }
    }
}
if (document.location.pathname.includes("/index.html")) {
    let numberPage = 1;
    pageList.addEventListener("click", function () {
        const dropMenu = document.getElementById("drop-menu");
        for (let i = 0; i < allPages; i++) {
            if (dropMenu.childNodes.length > allPages) {
                return;
            }
            const dropItem = document.createElement("li");
            dropMenu.append(dropItem);
            dropItem.innerText = numberPage++;
            dropItem.addEventListener("click", function () {
                let num = Number(dropItem.innerHTML);
                currentPageList.innerHTML = num;
                getFimlsFromServer(
                    `http://api.tvmaze.com/shows?page=${num}`,
                    quantityFilms.value === "Выбрать кол-во"
                        ? maxElements
                        : quantityFilms.value
                );
                currentPage = num;
            });
        }
    });

    arrowLeft.addEventListener("click", function () {
        if (currentPage === 1) {
            return;
        }
        getFimlsFromServer(
            `http://api.tvmaze.com/shows?page=${--currentPage}`,
            quantityFilms.value === "Выбрать кол-во"
                ? maxElements
                : quantityFilms.value
        );
        currentPageList.innerHTML = currentPage;
    });

    arrowRight.addEventListener("click", function () {
        if (currentPage === 5) {
            return;
        }
        getFimlsFromServer(
            `http://api.tvmaze.com/shows?page=${++currentPage}`,
            quantityFilms.value === "Выбрать кол-во"
                ? maxElements
                : quantityFilms.value
        );
        currentPageList.innerHTML = currentPage;
    });
    button.addEventListener("click", function () {
        getFimlsFromServer(
            inputSearch.value === ""
                ? `http://api.tvmaze.com/shows?page=${currentPage}`
                : `http://api.tvmaze.com/search/shows?q=${inputSearch.value}`,
            quantityFilms.value === "Выбрать кол-во"
                ? maxElements
                : quantityFilms.value
        );
    });
}
