const slideRange = document.getElementById("slideFilter");
const slideLine = document.getElementsByClassName("slide-line")[0];
const filterDiv = document.getElementsByClassName("filter")[0];
const codeElement = document.getElementsByClassName("code")[0];
const filterButtons = Array.from(
    document.querySelectorAll(".tool-btns button")
);
const filterValueInput = document.getElementsByClassName("input-value")[0];
let filterName = "blur";
let filterValue = 5;
slideRange.oninput = (e) => {
    const filterPos = e.target.value;
    slideLine.style.left = `calc(${filterPos}% - 6px)`;
    filterDiv.style.width = `calc(${filterPos}% - 12px)`;
};

filterValueInput.oninput = (e) => {
    filterValue = e.target.value;
    applyFilter();
};

// copy code

const copyBtn = document.getElementsByClassName("copy-btn")[0];
copyBtn.addEventListener("click", () => {
    copyBtn.innerText = "Copied !";
    window.navigator.clipboard.writeText(codeElement.innerText.toLowerCase());
    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 1500);
});

// filter btns
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterName = button.title.toLowerCase();

        if (filterName == "blur") {
            filterValueInput.min = 0;
            filterValueInput.max = 50;
            filterValueInput.value = 5;
            filterValue = 5;
            applyFilter();
        } else if (filterName == "hue-rotate") {
            filterValueInput.min = 0;
            filterValueInput.max = 360;
            filterValueInput.value = 70;
            filterValue = 70;
            applyFilter();
        } else if (filterName == "invert") {
            filterValueInput.min = 0;
            filterValueInput.max = 1;
            filterValueInput.value = 1;
            filterValue = 1;
            applyFilter();
        } else {
            filterValueInput.min = 0;
            filterValueInput.max = 200;
            filterValueInput.value = 130;
            filterValue = 130;
            applyFilter();
        }
    });
});

function applyFilter() {
    switch (filterName) {
        case "blur":
            filterDiv.style.backdropFilter = `blur(${filterValue}px)`;
            filterValueInput.placeholder = "Blur Value";
            codeElement.innerText = `filter:blur(${filterValue}px)`;
            break;
        case "contrast":
            filterDiv.style.backdropFilter = `contrast(${filterValue}%)`;
            filterValueInput.placeholder = "Contrast Value";
            codeElement.innerText = `filter:contrast(${filterValue}%);`;
            break;
        case "brightness":
            filterDiv.style.backdropFilter = `brightness(${filterValue}%)`;
            codeElement.innerText = `filter:brightness(${filterValue}%);`;
            filterValueInput.placeholder = "Brightness Value";
            break;
        case "sepia":
            filterDiv.style.backdropFilter = `sepia(${filterValue}%)`;
            codeElement.innerText = `filter:sepia(${filterValue}%);`;
            filterValueInput.placeholder = "Sepia Value";
            break;
        case "hue-rotate":
            filterDiv.style.backdropFilter = `hue-rotate(${filterValue}deg)`;
            codeElement.innerText = `filter:hue-rotate(${filterValue}deg);`;
            filterValueInput.placeholder = "Hue Value";
            break;
        case "invert":
            filterDiv.style.backdropFilter = `invert(${filterValue})`;
            codeElement.innerText = `filter:invert(${filterValue});`;
            filterValueInput.placeholder = "Invert Value";
    }
}
