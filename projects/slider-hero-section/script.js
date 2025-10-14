const triggerImg = Array.from(document.querySelectorAll(".images img"));
const imgContainer = document.getElementsByClassName("images")[0];
const bgImages = Array.from(document.querySelectorAll(".header-img"));
triggerImg.forEach((img, index) => {
    img.addEventListener("click", () => {
        bgImages.forEach((img) => img.classList.remove("active"));
        bgImages[index].classList.add("active");
    });
});
