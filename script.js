// Elements
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const foundText = document.getElementById("found");
const timeText = document.getElementById("time");
const resultText = document.getElementById("result");

const items = document.querySelectorAll(".item");
const ghost = document.getElementById("ghost");
const flashlight = document.getElementById("flashlight");

const jumpScare = document.getElementById("jumpScare");
const scream = document.getElementById("scream");

let found = 0;
let time = 60;
let timer;

/* START GAME */
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startTimer();
  moveGhost();
});

/* ITEM CLICK */
items.forEach(item => {
  item.addEventListener("click", () => {
    item.style.display = "none";
    found++;
    foundText.textContent = found;

    if (found === items.length) {
      endGame(true);
    }
  });
});

/* TIMER */
function startTimer() {
  timer = setInterval(() => {
    time--;
    timeText.textContent = time;

    if (Math.random() < 0.05) triggerJumpScare();

    if (time <= 0) endGame(false);
  }, 1000);
}

/* END GAME */
function endGame(win) {
  clearInterval(timer);
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  resultText.textContent = win ? "YOU ESCAPED 😱" : "YOU DIED 💀";
}

/* PLAY AGAIN */
playAgainBtn.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  found = 0;
  time = 60;
  foundText.textContent = found;
  timeText.textContent = time;

  items.forEach(item => item.style.display = "block");

  ghost.style.top = "0px";
  ghost.style.left = "0px";
}

/* JUMP SCARE */
function triggerJumpScare() {
  jumpScare.style.display = "flex";
  scream.currentTime = 0;
  scream.play();

  setTimeout(() => jumpScare.style.display = "none", 800);
}

/* GHOST MOVEMENT */
function moveGhost() {
  const room = document.getElementById("room");
  const roomWidth = room.offsetWidth - ghost.offsetWidth;
  const roomHeight = room.offsetHeight - ghost.offsetHeight;

  setInterval(() => {
    const x = Math.random() * roomWidth;
    const y = Math.random() * roomHeight;
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
  }, 1500);
}

/* FLASHLIGHT EFFECT */
document.getElementById("room").addEventListener("mousemove", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - flashlight.offsetWidth/2;
  const y = e.clientY - rect.top - flashlight.offsetHeight/2;
  flashlight.style.left = x + "px";
  flashlight.style.top = y + "px";
});