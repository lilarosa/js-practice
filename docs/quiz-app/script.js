// variables to keep track of what question, the user´s score, and whcih answer is correct for the current question
let questionNumber=0;
let score=0;
let correctAnswer= null;
let restart=0;

// variables to access elements on the webpage

let question=
document.getElementById("question");
let points=
document.getElementById("points");
let btnTrue=
document.getElementById("true");
btnTrue.addEventListener("pointerover", yellow);
btnTrue.addEventListener("pointerout", aquaT);
let btnFalse=
document.getElementById("false");
btnFalse.addEventListener("pointerover", darkGray);
btnFalse.addEventListener("pointerout", aquaF);
function yellow(){
    btnTrue.style.backgroundColor="yellow";
}
function darkGray(){
    btnFalse.style.backgroundColor="gray";
}
function aquaT(){
     btnTrue.style.backgroundColor="aqua";
}
function aquaF(){
    btnFalse.style.backgroundColor="aqua";
}
function trueButton(){
    if (correctAnswer===true){
        score=score+1;
        points.textContent=score;
        nextQuestion();
    }
    else{
        addNew();
        nextQuestion();
    }
}
function falseButton(){
    if (correctAnswer===false){
        score=score+1;
        points.textContent=score;
        nextQuestion();
    }
    else{
        addNew();
        nextQuestion();

    }
}
function nextQuestion(){
    questionNumber = questionNumber+1;
    switch (questionNumber){
        case 1:
            question.textContent="The capital of France is Paris.";
            correctAnswer=true;
            break;
        case 2:
            question.textContent="A triangle has four sides.";
            correctAnswer=false;
            break;
        case 3:
            question.textContent="The sun is a star."
            correctAnswer=true;
            break;
        case 4:
            question.textContent="Humans have five senses."
            correctAnswer=true;
            break;
        case 5:
            question.textContent="Penguins can fly."
            correctAnswer=false;
            break;
        case 6:
            question.textContent="Water boils at 100 degrees Celsius."
            correctAnswer=true;
            break;  
        default:
            question.textContent="You finished the Quiz!";
            correctAnswer=null; 
            restartNew();
            
            

                               
    }
}
function addNew(){
    let wrongItem=document.createElement("tr");
    let questionCell=document.createElement("td");
    questionCell.textContent=question.textContent;
    let answerCell=document.createElement("td");
    answerCell.textContent=correctAnswer;
    wrongItem.appendChild(questionCell);
    wrongItem.appendChild(answerCell);
    let container=document.getElementById("errorTable");
    container.appendChild(wrongItem);

}
function restartNew(){
    let restartButton=document.createElement("button");
    let btnText=document.createTextNode("Restart");
    restartButton.appendChild(btnText);
    let container=document.getElementById("scoreBox");
    container.appendChild(restartButton);
    restartButton.addEventListener("click", function(){
        location.reload();
    });
}



    
nextQuestion();


