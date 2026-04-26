let playerCards = [];
let dealerCards = [];
let gameOver = false;

function getCard() {
  let cards = [2,3,4,5,6,7,8,9,10,10,10,10,11];
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateScore(cards) {
  let sum = cards.reduce((a, b) => a + b, 0);

  // Handle Ace (11 → 1)
  while (sum > 21 && cards.includes(11)) {
    let index = cards.indexOf(11);
    cards[index] = 1;
    sum = cards.reduce((a, b) => a + b, 0);
  }

  return sum;
}

function renderCards(cards, elementId) {
  let container = document.getElementById(elementId);
  container.innerHTML = "";

  cards.forEach(card => {
    let div = document.createElement("div");
    div.className = "card";
    div.textContent = card;
    container.appendChild(div);
  });
}

function startGame() {
  playerCards = [getCard(), getCard()];
  dealerCards = [getCard(), getCard()];
  gameOver = false;
  document.getElementById("result").textContent = "";

  updateUI();
}

function updateUI() {
  renderCards(playerCards, "player-cards");
  renderCards(dealerCards, "dealer-cards");

  document.getElementById("player-score").textContent = calculateScore(playerCards);
  document.getElementById("dealer-score").textContent = calculateScore(dealerCards);
}

function hit() {
  if (gameOver) return;

  playerCards.push(getCard());
  updateUI();

  if (calculateScore(playerCards) > 21) {
    endGame();
  }
}

function stand() {
  if (gameOver) return;

  while (calculateScore(dealerCards) < 17) {
    dealerCards.push(getCard());
  }

  endGame();
}

function endGame() {
  gameOver = true;

  let playerScore = calculateScore(playerCards);
  let dealerScore = calculateScore(dealerCards);

  let result = "";

  if (playerScore > 21) result = "You Bust! 😢";
  else if (dealerScore > 21) result = "Dealer Bust! You Win! 🎉";
  else if (playerScore > dealerScore) result = "You Win! 🏆";
  else if (playerScore < dealerScore) result = "You Lose 😭";
  else result = "Draw 🤝";

  document.getElementById("result").textContent = result;
}

startGame();