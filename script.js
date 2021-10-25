const addContainerEl = document.getElementById("add-container");
const cardContainerEL = document.getElementById("cards-container");
const showBtn = document.getElementById("show");
const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentText = document.getElementById("current");
const clearBtn = document.getElementById("clear");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");

const cardsData = [];
const cardsEl = [];
let currentActiveCard = 0;

// Functions

function storeCardsToLS() {
  localStorage.setItem("cards", JSON.stringify(cardsData));
}

function getCardsFromLS() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards;
}

function init() {
  const cards = getCardsFromLS();
  if (cards != undefined) {
    cardsData.push(...cards);
    console.log("helloo");
    populateUI();
  }
}

function updateCurrentText() {
  currentText.innerHTML = `${currentActiveCard + 1}/${cardsData.length}`;
}

function updateUI(newCard) {
  const newCardEl = document.createElement("div");
  newCardEl.className = "card";
  newCardEl.innerHTML = `<div class="inner-card">
                      <div class="inner-card-front">
                        <p>${newCard["question"]}</p>
                      </div>
                      <div class="inner-card-back">
                        <p>${newCard["answer"]}</p>
                      </div>
                    </div>`;
  cardContainerEL.appendChild(newCardEl);
  cardsEl.push(newCardEl);
  newCardEl.addEventListener("click", () => {
    newCardEl.classList.toggle("show-answer");
  });
  if (cardsEl.length == 1) {
    cardsEl[0].className = "card active";
  }
  updateCurrentText();
}

function populateUI() {
  console.log("its above ");
  if (cardsData.length > 0) {
    console.log("its here now");
    console.log(cardsData);
    cardsData.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.innerHTML = `<div class="inner-card">
                            <div class="inner-card-front">
                              <p>${card["question"]}</p>
                            </div>
                            <div class="inner-card-back">
                              <p>${card["answer"]}</p>
                            </div>
                          </div>`;
      cardContainerEL.appendChild(cardEl);
      cardsEl.push(cardEl);
      cardEl.addEventListener("click", () => {
        cardEl.classList.toggle("show-answer");
      });
    });
    cardsEl[currentActiveCard].className = "card active";
    // console.log(cardsEl);
    updateCurrentText();
  }
}

// Event listener
showBtn.addEventListener("click", () => {
  addContainerEl.classList.add("show");
});

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newData = {
      question,
      answer,
    };
    cardsData.push(newData);
    storeCardsToLS();
    updateUI(newData);
    questionEl.value = "";
    answerEl.value = "";
  } else {
    alert("Fill the question and answer");
  }
});

hideBtn.addEventListener("click", () => {
  addContainerEl.classList.remove("show");
});

clearBtn.addEventListener("click", () => {
  cardsData.length = 0;
  cardContainerEL.innerHTML = "";
  cardsEl.length = 0;
  storeCardsToLS();
  currentActiveCard = 0;
  currentText.innerHTML = "";
});

previousBtn.addEventListener("click", () => {
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  } else {
    cardsEl[currentActiveCard + 1].className = "card";
    cardsEl[currentActiveCard].className = "card active";
  }
  console.log(currentActiveCard);
  updateCurrentText();
});

nextBtn.addEventListener("click", () => {
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  } else {
    cardsEl[currentActiveCard - 1].className = "card left";
    cardsEl[currentActiveCard].classList.add("active");
  }
  updateCurrentText();
});

init();
