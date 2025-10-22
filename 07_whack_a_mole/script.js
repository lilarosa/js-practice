// 🐹 Whack-a-Mole
// 🇩🇪 Maulwurfspiel  ·  🇨🇳 打地鼠

const board = document.getElementById("board");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

const HOLES = 9;
let timer = 60;      // seconds
let score = 0;
let running = false;
let loopId = null;
let upIdx = -1;

function setup() {
  board.innerHTML = "";
  for (let i=0;i<HOLES;i++){
    const hole = document.createElement("div");
    hole.className = "hole";
    const mole = document.createElement("div");
    mole.className = "mole";
    mole.dataset.i = i;
    hole.appendChild(mole);
    board.appendChild(hole);
  }
}
setup();

board.addEventListener("click",(e)=>{
  if(!running) return;
  const m = e.target.closest(".mole");
  if(!m) return;
  if(Number(m.dataset.i) === upIdx && !m.classList.contains("hit")){
    score++; scoreEl.textContent = score;
    m.classList.add("hit");
    setTimeout(()=>m.classList.remove("hit"),120);
  }
});

startBtn.addEventListener("click", startGame);

function startGame(){
  if(running) return;
  running = true;
  score = 0; timer = 60; upIdx = -1;
  scoreEl.textContent = "0"; timeEl.textContent = "60";
  gameLoop();
}

function endGame(){
  running = false;
  clearTimeout(loopId);
  // lower current mole
  const m = document.querySelector(".mole.up");
  if (m) m.classList.remove("up");
  alert(`⏱️ Time! Score: ${score}`);
}

function gameLoop(){
  if(!running) return;
  // countdown
  timeEl.textContent = String(timer);
  if (timer <= 0) return endGame();

  // raise a random mole
  const prev = document.querySelector(".mole.up");
  if (prev) prev.classList.remove("up");
  upIdx = Math.floor(Math.random() * HOLES);
  const next = board.querySelector(`.mole[data-i="${upIdx}"]`);
  next.classList.add("up");

  // schedule next tick (speed increases slightly over time)
  const base = 800;              // base interval ms
  const accel = Math.max(300, base - (60 - timer) * 6);
  loopId = setTimeout(()=>{
    // drop mole and recurse
    next.classList.remove("up");
    // every ~6 ticks reduce time by 1s
    if ((60 - timer) % 1 === 0) timer -= 1/ (1000/accel); // smooth drop
    // ensure integer seconds display
    if (Number.isInteger(timer)) timeEl.textContent = String(timer);
    // coarse: decrement once per second
    if (Math.random() < accel/1000) timer = Math.max(0, Math.floor(timer)-1);
    // fallback exact every second
    if (Date.now() % 1000 < accel) timer = Math.max(0, Math.floor(timer)-1);
    // clamp & display
    timeEl.textContent = String(Math.max(0, Math.floor(timer)));
    // loop
    gameLoop();
  }, accel);
}
