// 🧮 Calculator
// 🇩🇪 Grundrechenarten + AC/C/⌫/%
// 🇨🇳 加减乘除 + 清除/退格/百分比/小数点 + 键盘支持

const display = document.getElementById("display");
const keys = document.querySelector(".keys");
const extras = document.querySelector(".extras");

// State machine
let a = null;        // first operand
let op = null;       // operator: + - * /
let bTyping = false; // are we typing the second operand?
let justEq = false;  // last key was "="
let cur = "0";       // current input string

function render() { display.textContent = cur; }

function inputDigit(d) {
  if (justEq) { clearAll(); }
  if (!bTyping && op && cur === String(a)) {
    // start typing b
    cur = d;
    bTyping = true;
  } else {
    if (cur === "0") cur = d;
    else cur += d;
  }
  render();
}

function inputDot() {
  if (justEq) { clearAll(); }
  if (!cur.includes(".")) {
    cur += (cur === "" ? "0." : ".");
    render();
  }
}

function setOperator(nextOp) {
  if (op && bTyping) {
    // chain operation like 5 + 3 * 2
    evaluate();
  }
  a = parseFloat(cur);
  op = nextOp;
  bTyping = false;
  justEq = false;
  cur = String(a); // keep display consistent
  render();
}

function negate() {
  if (cur === "0") return;
  if (cur.startsWith("-")) cur = cur.slice(1);
  else cur = "-" + cur;
  render();
}

function percent() {
  // simple percent of current value
  let x = parseFloat(cur);
  if (isFinite(x)) {
    x = x / 100;
    cur = String(trimFloat(x));
    render();
  }
}

function backspace() {
  if (justEq) return;
  if (cur.length <= 1 || (cur.length === 2 && cur.startsWith("-"))) {
    cur = "0";
  } else {
    cur = cur.slice(0, -1);
  }
  render();
}

function clearEntry() {
  cur = "0";
  render();
}

function clearAll() {
  a = null; op = null; bTyping = false; justEq = false; cur = "0";
  render();
}

function evaluate() {
  if (!op) return;
  const x = a;
  const y = parseFloat(cur);
  let r;
  switch (op) {
    case "+": r = x + y; break;
    case "-": r = x - y; break;
    case "*": r = x * y; break;
    case "/":
      if (y === 0) {
        cur = "Error";
        render();
        a = null; op = null; bTyping = false; justEq = true;
        return;
      }
      r = x / y; break;
    default: return;
  }
  r = trimFloat(r);
  cur = String(r);
  a = r; // allow chaining: result as next 'a'
  op = null;
  bTyping = false;
  justEq = true;
  render();
}

function trimFloat(n) {
  // avoid 0.30000000004 etc.
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(10));
}

// Click handlers
keys.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof HTMLButtonElement)) return;

  if (t.dataset.num) return inputDigit(t.dataset.num);
  if (t.dataset.op) return setOperator(t.dataset.op);

  switch (t.dataset.act) {
    case "ac": return clearAll();
    case "clear": return clearEntry();
    case "back": return backspace();
    case "dot": return inputDot();
    case "neg": return negate();
    case "eq": return evaluate();
  }
});

extras.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.act === "percent") percent();
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const k = e.key;
  if (/\d/.test(k)) return inputDigit(k);
  if (k === ".") return inputDot();
  if (k === "Backspace") return backspace();
  if (k === "Escape") return clearAll();
  if (k === "Enter" || k === "=") return evaluate();
  if (["+", "-", "*", "/"].includes(k)) return setOperator(k);
});

// Init
render();
