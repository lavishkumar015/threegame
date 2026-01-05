const items = ["🍎", "🍌", "🍒", "🍇"];

let totalRounds = 0;
let currentRound = 1;
let roundPlayed = false;

function goToPage2() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter name");

  document.getElementById("showName").textContent = name;
  showPage(2);
}

function startGame() {
  totalRounds = parseInt(document.getElementById("rounds").value);
  if (!totalRounds) return alert("Enter rounds");

  currentRound = 1;
  roundPlayed = false;
  showPage(3);
  updateRoundText();
}

function playGame() {
  if (roundPlayed) {
    nextRound();
    return;
  }

  let win = false;

  // FIXED ROUND RESULTS
  if (currentRound === 2 || currentRound === 5) {
    win = true;
  }

  if (win) {
    const item = getRandomItem();
    setItems(item, item, item);
    document.getElementById("result").textContent = "You Win!";
  } else {
    let a = getRandomItem();
    let b = getRandomItem();
    let c = getRandomItem();
    while (a === b && b === c) {
      c = getRandomItem();
    }
    setItems(a, b, c);
    document.getElementById("result").textContent = "You Lose!";
  }

  roundPlayed = true;
}

function nextRound() {
  currentRound++;

  if (currentRound > totalRounds) {
    document.getElementById("result").textContent = "Game Over";
    return;
  }

  roundPlayed = false;
  clearItems();
  updateRoundText();
  document.getElementById("result").textContent = "Tap Play for next round";
}

function updateRoundText() {
  document.getElementById("roundText").textContent =
    `Round ${currentRound} of ${totalRounds}`;
}

function clearItems() {
  document.getElementById("item1").textContent = "?";
  document.getElementById("item2").textContent = "?";
  document.getElementById("item3").textContent = "?";
}

function setItems(a, b, c) {
  document.getElementById("item1").textContent = a;
  document.getElementById("item2").textContent = b;
  document.getElementById("item3").textContent = c;
}

function getRandomItem() {
  return items[Math.floor(Math.random() * items.length)];
}

function showPage(page) {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");

  document.getElementById(`page${page}`).classList.remove("hidden");
}
