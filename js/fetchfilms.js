import { mainSection, filterGenre, filterLang, maxElements } from "./script.js";

import { showFilms } from "./renderfilms.js";
export function getFimlsFromServer(url, maxElements) {
    fetch(url)
        .then((data) => {
            mainSection.innerHTML = "";
            return data.json();
        })
        .then((filtered) => {
            return filtered
                .filter((el) => {
                    const element = el.show || el;
                    if (filterGenre.value) {
                        return element.genres.includes(filterGenre.value);
                    }
                    return true;
                })
                .filter((el) => {
                    const element = el.show || el;
                    if (filterLang.value) {
                        return element.language.includes(filterLang.value);
                    }
                    return true;
                });
        })

        .then((result) => {
            showFilms(result.slice(0, maxElements));
        });
}
if (document.location.pathname.includes("/index.html") ||
    document.location.pathname === "/") {
    document.addEventListener(
        "DOMContentLoaded",
        getFimlsFromServer(`http://api.tvmaze.com/shows?page=1`, maxElements)
    );
}
