// ✅ Form Validator
// 🇩🇪 E-Mail & Passwort mit Live-Validierung
// 🇨🇳 邮箱与密码实时校验（含强度条、确认密码、勾选同意）

const form = document.getElementById("signupForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPw = document.getElementById("confirm");
const terms = document.getElementById("terms");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

const meterFill = document.getElementById("meterFill");
const rLen = document.getElementById("rLen");
const rUpper = document.getElementById("rUpper");
const rLower = document.getElementById("rLower");
const rDigit = document.getElementById("rDigit");
const rSpecial = document.getElementById("rSpecial");

const emailError = email.parentElement.querySelector(".error");
const pwError = password.parentElement.querySelector(".error");
const confirmError = confirmPw.parentElement.querySelector(".error");

// Simple validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialRegex = /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?`~\\|]/;

function checkEmail() {
  const ok = emailRegex.test(email.value.trim());
  emailError.textContent = ok ? "" : "Invalid email format.";
  return ok;
}

function scorePassword(pw) {
  // return {score:0..5, rules:{len,upper,lower,digit,special}}
  const rules = {
    len: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    digit: /\d/.test(pw),
    special: specialRegex.test(pw),
  };
  const score = Object.values(rules).filter(Boolean).length;
  return { score, rules };
}

function renderPwStrength() {
  const { score, rules } = scorePassword(password.value);
  // meter width 0..100
  meterFill.style.width = (score / 5) * 100 + "%";

  // render rule list
  [ [rLen, rules.len], [rUpper, rules.upper], [rLower, rules.lower],
    [rDigit, rules.digit], [rSpecial, rules.special] ]
    .forEach(([li, ok]) => li.classList.toggle("ok", ok));

  // message
  pwError.textContent = score >= 4 ? "" : "Password too weak.";
  return score >= 4;
}

function checkConfirm() {
  const ok = password.value !== "" && password.value === confirmPw.value;
  confirmError.textContent = ok ? "" : "Passwords do not match.";
  return ok;
}

function updateSubmitState() {
  const ok = checkEmail() && renderPwStrength() && checkConfirm() && terms.checked;
  submitBtn.disabled = !ok;
  result.textContent = ok ? "Looks good. You can submit ✅" : "";
}

// Live events
[email, password, confirmPw].forEach(el => {
  el.addEventListener("input", updateSubmitState);
});
terms.addEventListener("change", updateSubmitState);

// Prevent real submit (demo)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitBtn.disabled) return;
  result.textContent = "🎉 Submitted (demo) — data not actually sent.";
});

// Initialize
updateSubmitState();
