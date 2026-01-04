const items = ["🍎", "🍌", "🍒", "🍇"];
const playBtn = document.getElementById("playBtn");
const result = document.getElementById("result");

playBtn.addEventListener("click", playGame);

function playGame() {
  const chance = Math.floor(Math.random() * 100) + 1;

  if (chance === 1) {
    // WIN (1 out of 100)
    const winItem = getRandomItem();

    setItems(winItem, winItem, winItem);
    result.textContent = "You win!";
  } else {
    // LOSE (99 out of 100)
    let item1 = getRandomItem();
    let item2 = getRandomItem();
    let item3 = getRandomItem();

    while (item1 === item2 && item2 === item3) {
      item3 = getRandomItem();
    }

    setItems(item1, item2, item3);
    result.textContent = "Try again!";
  }
}

function getRandomItem() {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function setItems(a, b, c) {
  document.getElementById("item1").textContent = a;
  document.getElementById("item2").textContent = b;
  document.getElementById("item3").textContent = c;
}
