let secretNumber=Math.floor(Math.random()*100)+1;
let guessesLeft=10;
let guessHistory=[];

const input=document.getElementById("guessInput");
const submitBtn=document.getElementById("submitBtn");
const restartBtn=document.getElementById("restartBtn");
const feedback=document.getElementById("feedback");
const guessHistorySpan=document.getElementById("guessHistory");
const guessesLeftSpan=document.getElementById("guessLeft");

submitBtn.addEventListener("click",function(){
    const guess= Number(input.value);
    if (!guess || guess<1 ||guess>100) {
        feedback.textContent="Please enter a valid number between 1 and 100.";
        return;  
    }

    guessHistory.push(guess);
    guessesLeft=guessesLeft-1;

    guessHistorySpan.textContent=guessHistory.join(",");
    guessesLeftSpan.textContent=guessesLeft;

    if (guess=== secretNumber){
        feedback.textContent="Congratulations! You guessed the correct number!";
        endGame();
    }
    else if (guessesLeft===0){
        feedback.textContent=`Game over! The number was ${secretNumber}.`;
        endGame();
    }
    else if(guess<secretNumber){
        feedback.textContent="Too low!";
    }
    else{
        feedback.textContent="Too high!";
    }
    input.value="";
});


restartBtn.addEventListener("click",function(){
    secretNumber=Math.floor(Math.random()*100)+1;
    guessesLeft=10;
    guessHistory=[];
    feedback.textContent="";
    guessHistorySpan.textContent="";
    guessesLeftSpan.textContent=guessesLeft;
    restartBtn.style.display="none";
    submitBtn.disabled=false;
});

function endGame(){
    submitBtn.disabled=true;
    restartBtn.style.display="inline-block";
}