// -------------------------------
// engine.js (mit dynamischem Hintergrund)
// -------------------------------

// Startzustand
let currentScene = "portalraum";
let activeStone = "hellgrau"; // Start: hellgrauer Stein
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

  // Hintergrund dynamisch setzen
  setBackground(scene);

  let html = `<h2>${data.title}</h2><p>${data.text}</p>`;

  // Portalraum
  if (id === "portalraum") {
    let portalClass = "portal";
    if (activeStone) portalClass += " " + activeStone;
    html += `<div class="${portalClass}" onclick="enterPortal()"></div>`;
    if (unlocked.inventory) {
      html += `<p>Wähle einen Stein im Inventar, um das Portal zu aktivieren.</p>`;
    }
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
  if (activeStone === "hellgrau") showScene("kapitel1");
  else if (activeStone === "lila") showScene("kristallhoehe");
}

// UI updaten
function updateUI() {
  const inv = document.getElementById("inventory");
  const itemsDiv = document.getElementById("items");
  if (unlocked.inventory) {
    inv.classList.remove("hidden");
    itemsDiv.innerHTML = "";
    inventory.stones.forEach(stone => {
      itemsDiv.innerHTML += `<div class="stone ${stone}" onclick="setActiveStone('${stone}')"></div>`;
    });
  }

  const lib = document.getElementById("library");
  const booksDiv = document.getElementById("books");
  if (unlocked.library) {
    lib.classList.remove("hidden");
    booksDiv.innerHTML = inventory.books.length > 0 ? inventory.books.join("<br>") : "Keine Bücher gesammelt.";
  }
}

// Stein setzen
function setActiveStone(stone) {
  activeStone = stone;
  showScene("portalraum"); // Hintergrund + Portal direkt aktualisieren
}

// -------------------------------
// Hintergrund setzen
// -------------------------------
function setBackground(scene) {
  scene.className = ""; // alle bisherigen Klassen entfernen

  if (currentScene !== "portalraum") return; // nur Portalraum

  if (activeStone === "lila") {
    scene.classList.add("bg-lila");
    addStars(scene, 50); // 50 Sterne
    addSketches(scene, 5); // 5 Skizzen
  } else {
    scene.classList.add("bg-grey");
    removeStarsAndSketches(scene);
  }
}

// Sterne hinzufügen
function addStars(container, count) {
  removeStarsAndSketches(container); // vorherige entfernen

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = star.style.height = Math.random() * 3 + 1 + "px";
    star.style.animationDuration = 2 + Math.random() * 3 + "s";
    container.appendChild(star);
  }
}

// Skizzen hinzufügen
function addSketches(container, count) {
  for (let i = 0; i < count; i++) {
    const sketch = document.createElement("div");
    sketch.className = "sketch";
    sketch.style.left = Math.random() * 90 + "%";
    sketch.style.top = Math.random() * 80 + "%";
    sketch.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(sketch);
  }
}

// Sterne & Skizzen entfernen
function removeStarsAndSketches(container) {
  container.querySelectorAll(".star, .sketch").forEach(el => el.remove());
}





