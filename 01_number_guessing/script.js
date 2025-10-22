// 🎯 Number Guessing Game
// 🇩🇪 Zahlenratespiel  ·  🇨🇳 猜数字游戏  ·  🇬🇧 Guess a number between 1 and 100

let randomNumber = Math.floor(Math.random() * 100) + 1; // 生成随机数（1-100）
let attemptsLeft = 10; // 尝试次数
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

// 🇬🇧 Check button click event
// 🇩🇪 Klick-Event für "Check"
// 🇨🇳 “检查”按钮点击事件
checkBtn.addEventListener("click", () => {
  const guess = Number(input.value);
  if (!guess) {
    message.textContent = "❗ Please enter a valid number.";
    return;
  }

  attemptsLeft--;
  attemptsDisplay.textContent = attemptsLeft;

  if (guess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    endGame();
  } else if (attemptsLeft === 0) {
    message.textContent = `💀 Game over! The number was ${randomNumber}.`;
    endGame();
  } else if (guess < randomNumber) {
    message.textContent = "📉 Too low! Try again.";
  } else {
    message.textContent = "📈 Too high! Try again.";
  }
});

// 🇬🇧 End game function
// 🇩🇪 Spiel beenden
// 🇨🇳 游戏结束逻辑
function endGame() {
  input.disabled = true;
  checkBtn.disabled = true;
  resetBtn.classList.remove("hidden");
}

// 🇬🇧 Reset button event
// 🇩🇪 Neustart-Button
// 🇨🇳 重新开始按钮
resetBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  input.disabled = false;
  checkBtn.disabled = false;
  input.value = "";
  message.textContent = "Start guessing!";
  attemptsDisplay.textContent = attemptsLeft;
  resetBtn.classList.add("hidden");
});
