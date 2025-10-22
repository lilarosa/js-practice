// ⏱️ Stopwatch / Timer
// 🇩🇪 Stoppuhr & Timer  ·  🇨🇳 秒表与倒计时  ·  🇬🇧 Stopwatch & Countdown

// Elements
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const ms = document.getElementById("ms");
const btnStopwatch = document.getElementById("btnStopwatch");
const btnTimer = document.getElementById("btnTimer");
const timerInputs = document.getElementById("timerInputs");
const inputMin = document.getElementById("inputMin");
const inputSec = document.getElementById("inputSec");
const applyTimer = document.getElementById("applyTimer");
const startPause = document.getElementById("startPause");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");
const laps = document.getElementById("laps");
const beep = document.getElementById("beep");

// State
let mode = "stopwatch"; // "stopwatch" | "timer"
let intervalId = null;
let running = false;

// Stopwatch counters (in ms)
let elapsed = 0;   // 已经过去的毫秒（秒表）
let lastTick = 0;

// Timer counters (in ms)
let remaining = 60_000; // 默认 1 分钟
let targetEnd = 0;

// Format helper
function fmt(n, len = 2) { return String(n).padStart(len, "0"); }
function renderFromMs(totalMs) {
  const hundredths = Math.floor((totalMs % 1000) / 10);
  const totalSec = Math.floor(totalMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  hh.textContent = fmt(h);
  mm.textContent = fmt(m);
  ss.textContent = fmt(s);
  ms.textContent = fmt(hundredths);
}

// Switch mode
btnStopwatch.addEventListener("click", () => switchMode("stopwatch"));
btnTimer.addEventListener("click", () => switchMode("timer"));

function switchMode(next) {
  stop(); // ensure clean state
  mode = next;
  btnStopwatch.classList.toggle("active", mode === "stopwatch");
  btnTimer.classList.toggle("active", mode === "timer");
  btnStopwatch.setAttribute("aria-selected", mode === "stopwatch");
  btnTimer.setAttribute("aria-selected", mode === "timer");
  timerInputs.classList.toggle("hidden", mode !== "timer");
  if (mode === "stopwatch") {
     elapsed = 0;
     renderFromMs(0);
  } else {
     remaining = Math.max(0, (Number(inputMin.value)||0)*60_000 + (Number(inputSec.value)||0)*1000);
     renderFromMs(remaining);
  }
  startPause.textContent = "Start";
  laps.innerHTML = "";
}

// Start / Pause
startPause.addEventListener("click", () => {
  if (running) { stop(); }
  else { start(); }
});

function start() {
  if (running) return;
  running = true;
  startPause.textContent = "Pause";
  lastTick = performance.now();

  if (mode === "timer") {
    // Initialize target end time
    targetEnd = performance.now() + remaining;
  }

  intervalId = setInterval(tick, 10); // 100 Hz for smooth hundredths
}

function stop() {
  if (!running) return;
  running = false;
  startPause.textContent = "Start";
  clearInterval(intervalId);
  intervalId = null;
}

reset.addEventListener("click", () => {
  stop();
  if (mode === "stopwatch") {
    elapsed = 0;
    renderFromMs(0);
  } else {
    remaining = Math.max(0, (Number(inputMin.value)||0)*60_000 + (Number(inputSec.value)||0)*1000);
    renderFromMs(remaining);
  }
  laps.innerHTML = "";
});

lap.addEventListener("click", () => {
  // 🇬🇧 Record a lap (only meaningful for stopwatch, but allowed in both)
  const li = document.createElement("li");
  const stamp = `${hh.textContent}:${mm.textContent}:${ss.textContent}.${ms.textContent}`;
  li.innerHTML = `<span class="idx">#${laps.children.length + 1}</span><span>${stamp}</span>`;
  laps.prepend(li);
});

// Apply timer values
applyTimer.addEventListener("click", () => {
  if (running) stop();
  const m = Math.max(0, Number(inputMin.value) || 0);
  const s = Math.max(0, Math.min(59, Number(inputSec.value) || 0));
  remaining = m * 60_000 + s * 1000;
  renderFromMs(remaining);
});

// Tick
function tick() {
  const now = performance.now();
  const delta = now - lastTick;
  lastTick = now;

  if (mode === "stopwatch") {
    elapsed += delta;
    renderFromMs(elapsed);
  } else {
    remaining = Math.max(0, targetEnd - now);
    renderFromMs(remaining);

    // Final seconds visual cue
    if (remaining <= 5_000) {
      ss.parentElement.classList.add("warn");
    } else {
      ss.parentElement.classList.remove("warn");
    }

    if (remaining === 0) {
      stop();
      try { beep.currentTime = 0; beep.play(); } catch (_) {}
    }
  }
}

// Initialize view
switchMode("stopwatch");
