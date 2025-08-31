let currentScene = "portalraum";
let activeStone = null;
let gameData = {};
let inventory = {
  stones: ["hellgrau", "lila"],
  items: [],
  books: []
};
let unlocked = {
  inventory: false,
  library: false
};

// Spiel starten
fetch("kapitel.json")
  .then(res => res.json())
  .then(data => {
    gameData = data;
    showScene("portalraum");
  });

// Szene anzeigen
function showScene(id) {
  currentScene = id;
  const scene = document.getElementById("scene");
  const data = gameData[id];

  let html = `<h2>${data.title}</h2><p>${data.text}</p>`;

  // Portalraum = Portal + Steinauswahl
if (id === "portalraum") {
  let portalClass = "portal";
  if (activeStone) {
    portalClass += " " + activeStone; // hängt die Stein-Klasse an
  }
  html += `<div class="${portalClass}" onclick="enterPortal()"></div>`;
  html += `<p>Wähle einen Stein im Inventar, um das Portal zu aktivieren.</p>`;
}

  // Choices
  if (data.choices) {
    data.choices.forEach(choice => {
      html += `<button onclick="showScene('${choice.target}')">${choice.text}</button>`;
    });
  }

  // Unlocks
  if (data.unlock) {
    if (data.unlock.inventory) unlocked.inventory = true;
    if (data.unlock.library) unlocked.library = true;
    updateUI();
  }

  scene.innerHTML = html;
}

// Portal betreten
function enterPortal() {
  if (!activeStone) {
    alert("Wähle zuerst einen Stein aus dem Inventar!");
    return;
  }
  if (activeStone === "hellgrau") {
    showScene("kapitel1");
  } else if (activeStone === "lila") {
    showScene("kristallhoehe");
  }
}

// UI updaten
function updateUI() {
  // Inventar
  const inv = document.getElementById("inventory");
  const itemsDiv = document.getElementById("items");
  if (unlocked.inventory) {
    inv.classList.remove("hidden");
    itemsDiv.innerHTML = "";
    inventory.stones.forEach(stone => {
      itemsDiv.innerHTML += `<div class="stone ${stone}" onclick="setActiveStone('${stone}')"></div>`;
    });
  }

  // Bibliothek
  const lib = document.getElementById("library");
  const booksDiv = document.getElementById("books");
  if (unlocked.library) {
    lib.classList.remove("hidden");
    booksDiv.innerHTML = inventory.books.length > 0 ? inventory.books.join("<br>") : "Keine Bücher gesammelt.";
  }
}

// Aktiven Stein setzen
function setActiveStone(stone) {
  activeStone = stone;
  alert("Aktiver Stein: " + stone);
}

