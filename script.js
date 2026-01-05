const items = ["🍎", "🍌", "🍒", "🍇"];

let totalMatches = 0;
let currentMatch = 1;
let spinCount = 0;

// Win sirf in matches me hoga
// 1 lose, 2 win, 3 lose, 4 lose, 5 lose,
// 6 win, 7 lose, 8 lose, 9 lose, 10 win
const winMatches = [2, 6, 10];

function goToPage2() {
  const name = document.getElementById("username").value;
  if (!name) {
    alert("Enter name");
    return;
  }

  document.getElementById("showName").textContent = name;
  showPage(2);
}

function startGame() {
  const value = document.getElementById("rounds").value;
  if (!value) {
    alert("Select matches");
    return;
  }

  totalMatches = parseInt(value);
  currentMatch = 1;
  spinCount = 0;

  clearItems();
  updateText();
  document.getElementById("result").textContent = "Tap Play";

  showPage(3);
}

function playGame() {
  if (currentMatch > totalMatches) {
    document.getElementById("result").textContent = "Game Over";
    return;
  }

  spinCount++;

  let win = false;

  if (winMatches.includes(currentMatch) && spinCount === 3) {
    win = true;
  }

  if (win) {
    const item = randomItem();
    setItems(item, item, item);
    document.getElementById("result").textContent = "YOU WIN";
    nextMatch();
    return;
  }

  let a = randomItem();
  let b = randomItem();
  let c = randomItem();

  while (a === b && b === c) {
    c = randomItem();
  }

  setItems(a, b, c);
  document.getElementById("result").textContent =
    `Match ${currentMatch} - Spin ${spinCount}: LOSE`;

  if (spinCount === 3) {
    nextMatch();
  }
}

function nextMatch() {
  currentMatch++;
  spinCount = 0;

  if (currentMatch > totalMatches) {
    document.getElementById("result").textContent = "Game Finished";
    return;
  }

  clearItems();
  updateText();
}

function updateText() {
  document.getElementById("roundText").textContent =
    `Match ${currentMatch} of ${totalMatches}`;
}

function setItems(a, b, c) {
  document.getElementById("item1").textContent = a;
  document.getElementById("item2").textContent = b;
  document.getElementById("item3").textContent = c;
}

function clearItems() {
  document.getElementById("item1").textContent = "?";
  document.getElementById("item2").textContent = "?";
  document.getElementById("item3").textContent = "?";
}

function randomItem() {
  return items[Math.floor(Math.random() * items.length)];
}

function showPage(p) {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");

  document.getElementById(`page${p}`).classList.remove("hidden");
}
