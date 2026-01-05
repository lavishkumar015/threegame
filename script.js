const items = ["🍎", "🍌", "🍒", "🍇"];

// GAME STATE
let currentMatch = 1;
let totalMatches = 0;
let spinCount = 0;

// FIXED WIN MATCHES
// 1 lose, 2 win, 3 lose, 4 lose, 5 lose,
// 6 win, 7 lose, 8 lose, 9 lose, 10 win
const winMatches = [2, 6, 10];

/* ---------- PAGE NAVIGATION ---------- */

function goToPage2() {
  const name = document.getElementById("username").value;
  if (!name) {
    alert("Please enter your name");
    return;
  }

  document.getElementById("showName").textContent = name;
  showPage(2);
}

function startGame() {
  const selected = document.getElementById("rounds").value;
  if (!selected) {
    alert("Please select total matches");
    return;
  }

  totalMatches = parseInt(selected);
  currentMatch = 1;
  spinCount = 0;

  clearItems();
  document.getElementById("result").textContent = "Tap Play to start";
  updateMatchText();

  showPage(3);
}

/* ---------- GAME LOGIC ---------- */

function playGame() {
  if (currentMatch > totalMatches) {
    document.getElementById("result").textContent = "Game Over";
    return;
  }

  spinCount++;

  const isWinMatch = winMatches.includes(currentMatch);
  let isWin = false;

  // Win sirf 3rd spin me (agar win match hai)
  if (isWinMatch && spinCount === 3) {
    isWin = true;
  }

  if (isWin) {
    const winItem = getRandomItem();
    setItems(winItem, winItem, winItem);

    document.getElementById("result").textContent =
      `Match ${currentMatch}: YOU WIN`;

    nextMatch();
    return;
  }

  // LOSE logic (kabhi accidental win nahi)
  let a = getRandomItem();
  let b = getRandomItem();
  let c = getRandomItem();

  while (a === b && b === c) {
    c = getRandomItem();
  }

  setItems(a, b, c);

  document.getElementById("result").textContent =
    `Match ${currentMatch} - Spin ${spinCount}: YOU LOSE`;

  // 3 spins ke baad match finish
  if (spinCount === 3) {
    nextMatch();
  }
}

/* ---------- MATCH CONTROL ---------- */

function nextMatch() {
  currentMatch++;
  spinCount = 0;

  if (currentMatch > totalMatches) {
    document.getElementById("result").textContent = "Game Finished";
    return;
  }

  clearItems();
  updateMatchText();
}

function updateMatchText() {
  document.getElementById("roundText").textContent =
    `Match ${currentMatch} of ${totalMatches}`;
}

/* ---------- UI HELPERS ---------- */

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
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

/* ---------- PAGE SWITCH ---------- */

function showPage(page) {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");

  document.getElementById(`page${page}`).classList.remove("hidden");
}
