const gameContainer = document.getElementById("game");
const starsCanvas = document.getElementById("stars");
const ctx = starsCanvas.getContext("2d");

let currentBackground = "grey"; // Start mit grauem Stein
let crystalsLoaded = false;

// Resize Canvas
function resizeCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Sternenhimmel
let stars = [];
function createStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  if (currentBackground === "lilac") {
    ctx.fillStyle = "white";
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > starsCanvas.height) star.y = 0;
    });
  }
  requestAnimationFrame(drawStars);
}
createStars();
drawStars();

// Portalraum laden
function loadPortalraum() {
  gameContainer.innerHTML = "";
  gameContainer.className = "portalraum";

  const portal = document.createElement("div");
  portal.className = "portal";
  portal.onclick = () => {
    if (currentBackground === "grey") loadKapitel1();
    if (currentBackground === "lilac") loadKristallhöhle();
  };

  const stones = document.createElement("div");
  stones.innerHTML = `
    <img src="assets/stone_grey.png" class="stone" onclick="setStone('grey')">
    <img src="assets/stone_lilac.png" class="stone" onclick="setStone('lilac')">
  `;

  gameContainer.appendChild(portal);
  gameContainer.appendChild(stones);

  // Automatisch den grauen Stein aktivieren
  setStone("grey");

  // Kristalle nur einmal laden
  if (!crystalsLoaded) {
    addCrystals();
    crystalsLoaded = true;
  }
}

// Portalstein einsetzen
function setStone(color) {
  currentBackground = color;
  if (color === "grey") {
    stars = []; // keine Sterne
    gameContainer.style.background = "radial-gradient(circle, #f3effa, #d4c4ef)";
  } else if (color === "lilac") {
    createStars();
    gameContainer.style.background = "radial-gradient(circle, #27113e, #763fb1)";
  }
}

// Kristall-Splitter zufällig im Raum verteilen
function addCrystals() {
  for (let i = 1; i <= 10; i++) {
    const crystal = document.createElement("img");
    crystal.src = `assets/crystal${i}.png`;
    crystal.className = "crystal";
    crystal.style.left = Math.random() * window.innerWidth + "px";
    crystal.style.top = Math.random() * window.innerHeight + "px";
    crystal.style.width = 20 + Math.random() * 40 + "px";
    crystal.style.animationDuration = 8 + Math.random() * 5 + "s";
    gameContainer.appendChild(crystal);
  }
}

// Kapitel 1
function loadKapitel1() {
  gameContainer.innerHTML = `
    <div style="padding: 20px;">
      <h1>Kapitel 1</h1>
      <p>Hier beginnt deine Reise...</p>
      <button onclick="loadPortalraum()">Zurück zum Portalraum</button>
    </div>
  `;
}

// Kristallhöhle
function loadKristallhöhle() {
  gameContainer.innerHTML = `
    <div style="padding: 20px;">
      <h1>Kristallhöhle</h1>
      <p>Ein mystischer Raum voller Geheimnisse...</p>
      <button onclick="loadPortalraum()">Zurück zum Portalraum</button>
    </div>
  `;
}

// Start
loadPortalraum();







