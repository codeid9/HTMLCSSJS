const images = [
    "banana.jpg",
    "coconut.jpg",
    "grapes.jpg",
    "orange.jpg",
    "pear.jpg",
    "pineapple.jpg",
    "pomegranate.jpg",
    "strawberry.jpg",
    "apricot.jpg",
    "blueberry.png",
    "jamun.jpg",
    "kivi.jpg",
    "mango.jpg",
    "melon.jpg",
    "raspberry.jpg",
    "watermelon.jpg",
];
const welcomeScreen = document.getElementsByClassName("welcome")[0];
const gameBoard = document.getElementsByClassName("board")[0];
const gameLavelInput = document.getElementById("gameLevel");
const scoreElement = document.getElementsByClassName("score")[0];
const attemptsElement = document.getElementsByClassName("attempts")[0];
let score = 0;
let win = false;
let attempts = 0;
function createCard(imgUrl) {
    const card = document.createElement("div");
    card.classList.add("card");
    const innerCard = document.createElement("div");
    innerCard.classList.add("inner-card");
    const frontFace = document.createElement("div");
    frontFace.innerText = "?";
    frontFace.classList = "card-face card-front";
    const backFace = document.createElement("div");
    backFace.classList = "card-face card-back";
    const img = document.createElement("img");
    img.src = imgUrl;
    backFace.appendChild(img);
    innerCard.appendChild(frontFace);
    innerCard.appendChild(backFace);
    card.appendChild(innerCard);
    return card;
}

function sufflArray(array) {
    let arr = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        return arr;
    }
}

function createImageArray(gridSize) {
    const imageArray = [];
    for (let i = 0; i < gridSize ** 2 * 0.5; i++) {
        imageArray.push(images[i%7]);
    }
    imageArray.push(...imageArray);
    const suffledArray = sufflArray(imageArray);
    return suffledArray;
}

function checkWin(totalCards){
    const totalMatchedCards = Array.from(document.querySelectorAll('.matched')).length;
    if(totalCards == totalMatchedCards){
        return true;
    }else{
        return false;
    }
}

function gameLogic(urls) {
    const cards = Array.from(document.querySelectorAll(".card"));
    let clickedCardIndexs = [];
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            card.classList.add("active");
            clickedCardIndexs.push(index);
            if (clickedCardIndexs.length == 2) {
                if (urls[clickedCardIndexs[0]] !== urls[clickedCardIndexs[1]]) {
                    setTimeout(() => {
                        Array.from(
                            document.querySelectorAll(".card.active")
                        ).forEach((clickedCard) => {
                            if (!clickedCard.classList.contains("matched")) {
                                clickedCard.classList.remove("active");
                            }
                        });
                    }, 800);
                    // add clear timeout
                } else {
                    Array.from(
                        document.querySelectorAll(".card.active")
                    ).forEach((clickedCard) => {
                        clickedCard.classList.add("matched");
                    });
                    score += 100;
                    scoreElement.innerText = `Score:${score}`;
                }
                attempts+=1;
                attemptsElement.innerText = `Attempts:${attempts}`;
                clickedCardIndexs.length = 0;
                win = checkWin(urls.length);
                if(win) resetGame();
            }
        });
    });
}

function renderGrid(gridSize, urls) {
    for (let i = 0; i < gridSize ** 2; i++) {
        const card = createCard(`img/${urls[i]}`);
        gameBoard.appendChild(card);
    }
}

function resetGame(){
    setTimeout(()=>{
        alert(`You win the game in ${attempts} attempts score is : ${score}`);
        window.location.reload();
    },800)
}

function init() {
    const level = gameLavelInput.value;
    welcomeScreen.style.display = "none";
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${level},1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${level},1fr)`;
    scoreElement.innerText = `Score:${score}`;
    attemptsElement.innerText = `Attempts:${attempts}`;
    // add images
    const imageUrls = createImageArray(level);
    renderGrid(level, imageUrls);
    gameLogic(imageUrls);
}
// init();
