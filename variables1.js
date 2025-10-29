var score = 0;
var answer;
const questionAmount = 5;
const answerAmount = 4;


const submitButton = document.getElementById('submit');
const quizContainer = document.getElementById('quiz');

//returns array of random numbers from [0, upperBound] with length n
function getRandom (n, upperBound) {
    let randomNumbers = [];
    while (randomNumbers.length < n) {
        let rand = (Math.floor(Math.random() * (upperBound-1)));
        if (!randomNumbers.includes(rand)){
            randomNumbers.push(rand);
        }
    }
    return randomNumbers;
}

function setQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswerNum = Math.floor(Math.random() * (answerAmount-1));
    var optionArray = getRandom(answerAmount, 10);
    answer = num2-num1;
    document.getElementById('PROBLEM_TEXT').innerText = num1 + "+x=" + num2;
    for (let i = 0; i < answerAmount; i++) {
        const optionLabel = document.createElement("label");
        const option = document.createElement("input");
        option.type = 'radio';
        option.name = 'q';
        if (i != correctAnswerNum){
            optionLabel.textContent = optionArray[i];
            option.value = optionArray[i];
        }
        else {
            optionLabel.textContent = answer;    
            option.value = answer;
        }
        quizContainer.appendChild(option);
        quizContainer.appendChild(optionLabel);
    }

}

function checkAnswer() {
    const userAnswer = document.querySelector('input[name="q"]:checked').value;
    if (userAnswer != answer){
        document.getElementById('PROBLEM_TEXT').innerText = "I hate you. Forever. " + score;
    }
    else {
        document.getElementById('PROBLEM_TEXT').innerText = "Thank you, Ted. " + score;
        score++;
    }
}

setQuestion()

/*
function results(){
    function showResults(quizContainer) {
        let userAnswer = (quizContainer.querySelector("input[name='q']:checked")||{}).value;
        if (userAnswer == num2-num1) {
            document.getElementById('PROBLEM_TEXT').innerText = userAnswer; 
        }
        else {
            document.getElementById('PROBLEM_TEXT').innerText = userAnswer; 
        }
    }

    submitButton.onclick = function() {
        showResults(quizContainer);
    }
}
*/
