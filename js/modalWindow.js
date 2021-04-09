import { render } from "./renderfilms.js";

export const createModal = (el) => {
    const wrapper = document.getElementById("wrapper");
    const modal = document.getElementById("modal");
    const description = document.createElement("p");
    render(el, "modal");
    const btnFav = document.getElementById("favorite");
    const filmDesc = document.getElementById("film-desc");
    filmDesc.append(description);
    description.className = "description";
    description.innerHTML = `${el.summary}`;
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.firstChild.style.width = "50%";
    modal.firstChild.style.backgroundColor = "#fff";
    modal.firstChild.style.position = "absolute";
    modal.firstChild.style.top = "50%";
    modal.firstChild.style.left = "50%";
    modal.firstChild.style.borderRadius = "20px";
    modal.firstChild.style.transform = "translate(-50%,-50%)";
    modal.firstChild.style.boxShadow = "none";
    wrapper.style.transition = "1.2s";
    wrapper.style.backgroundColor = "gray";
    wrapper.style.opacity = "0.5";
    btnFav.style.display = "none";
    document.body.style.overflow = "hidden";
    modal.addEventListener("click", function () {
        modal.style.transition = "0.5s";
        modal.style.visibility = "hidden";
        wrapper.style.transition = "0.5s";
        modal.style.opacity = "0";
        wrapper.style.backgroundColor = "#fff";
        wrapper.style.opacity = "1";
        document.body.style.overflow = "auto";
        modal.innerHTML = "";
    });
};
