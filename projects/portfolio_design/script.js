const navIcon = document.getElementsByClassName("nav-icon")[0];
const menu = document.getElementsByClassName("menu")[0];
navIcon.onclick = function () {
    menu.classList.toggle("active");
};
Array.from(document.querySelectorAll(".menu li a")).forEach((item) => {
    item.onclick = function () {
        menu.classList.remove("active");
    };
});
