//basic variables
var score = 0;
var answer;
const questionAmount = 5;
const answerAmount = 4;
const topic = "operations1";
const textThatHelps = "Remember the order of operations: PEMDAS.";
const textThatHelps2 = "This stands for Parantheses, Exponents, Multiplication, Division, Addition, and Subtraction.";
const textThatHelps3 = "Multiplication and division should be done together, left to right. Addition and subtraction should also be done together, left to right.";

//graphics
var blueCircle = "./data/bluecircle100.png";
var blackCircle = "./data/blackcircle100.png";

const submitButton = document.getElementById('submit');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');

var stars;
const starText = document.getElementById("starText");
if (localStorage.getItem(topic) == 0) {stars = "";}
else if (localStorage.getItem(topic) == 1) {stars = "⭐";}
else if (localStorage.getItem(topic) == 2) {stars = "⭐⭐";}
else if (localStorage.getItem(topic) >= 3) {stars = "[⭐⭐⭐]";}
else {stars = "";}
starText.innerText = stars;

//returns array of random numbers from [0, upperBound] with length n
function getRandom (n, upperBound) {
    let randomNumbers = [];
    while (randomNumbers.length < n) {
        let rand = (Math.floor(Math.random() * (upperBound-1))) * Math.floor(Math.random() - 0.5);
        if (!randomNumbers.includes(rand)){
            randomNumbers.push(rand);
        }
    }
    return randomNumbers;
}

//pos only
function getRandom (n, upperBound, avoidNum) {
    let randomNumbers = [];
    while (randomNumbers.length < n) {
        let rand = (Math.floor(Math.random() * (upperBound-1)));
        if (!randomNumbers.includes(rand) && rand!=avoidNum){
            randomNumbers.push(rand);
        }
    }
    return randomNumbers;
}

function setQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const correctAnswerNum = Math.floor(Math.random() * (answerAmount-1));
    answer = num1+(num2*num3);
    var optionArray = getRandom(answerAmount, 40, answer);
    document.getElementById('PROBLEM_TEXT').innerText = num1 + "+" + num2 + "*" + num3;
    const optionContainer = document.createElement("div");
    const optionRow1 = document.createElement("div");
    const optionRow2 = document.createElement("div");
    optionContainer.id = "optionContainer";
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

        if (i < 2) {
            optionRow1.appendChild(option);
            optionRow1.appendChild(optionLabel);
        }
        else {
            optionRow2.appendChild(option);
            optionRow2.appendChild(optionLabel);        
        }
        optionContainer.appendChild(optionRow1);
        optionContainer.appendChild(optionRow2);
        quizContainer.appendChild(optionContainer);
    }

}

function checkAnswer() {
    const userAnswer = document.querySelector('input[name="q"]:checked').value;
    let resultsText = document.createElement("p");
    resultsText.id = "resultsText";
    if (document.getElementById("resultsText") != null) {document.getElementById("resultsText").remove();}

    if (userAnswer != answer && score != questionAmount){
        resultsText.innerText = "Not quite. Try again!";
        if (score > 0){
            score--;
        }
        updateCircles(score);
    }
    else if (userAnswer == answer && score < questionAmount - 1) {
        resultsText.innerText = "Nice job!";
        score++;
        document.getElementById('optionContainer').remove();
        updateCircles(score);
        setQuestion();
    }
    else {
        resultsText.innerText = "You did it! Head back to the home page to do some more problems!";
        if (score < questionAmount) {
            score++;
        }
        updateCircles(score);
        const runningScore = localStorage.getItem(topic);
        if (runningScore != null) {
            localStorage.setItem(topic, Number(localStorage.getItem(topic)) + 1);
        }
        else {
            localStorage.setItem(topic, 1);
        }
    }
    
    resultsContainer.appendChild(resultsText);
}

//update circles to show n filled in circles
function updateCircles(n) {
    if (document.getElementById('circleContainer') != null) {
        document.getElementById('circleContainer').remove();
    }
    const circleContainerOriginal = document.getElementById("circles");
    const circleContainer = document.createElement("div");
    circleContainer.id = "circleContainer";
    var circleTable = document.createElement("table");
    var circleTr = document.createElement("tr");
    for (let i = 0; i < questionAmount; i++) {
        if (i < n) {
            const circleData = document.createElement("td");
            circleData.innerHTML = "<img class=\"c\" id=\"c\" src=" + blueCircle + "></img>";
            circleTr.appendChild(circleData);
            //circleContainerOriginal.appendChild(circleContainer);
        }
        else {
            const circleData = document.createElement("td");
            circleData.innerHTML = "<img class=\"c\" id=\"c\" src=" + blackCircle + "></img>";
            circleTr.appendChild(circleData);
            //circleContainerOriginal.appendChild(circleContainer);
        }
    }
    circleTable.appendChild(circleTr);
    circleContainer.appendChild(circleTable);
    circleContainerOriginal.appendChild(circleContainer);
}

function sendHelp () {
    var help_text = document.getElementById("HELP_TEXT");
    var help_text2 = document.getElementById("HELP_TEXT2");
    var help_text3 = document.getElementById("HELP_TEXT3");
    help_text.innerText = textThatHelps;
    help_text2.innerText = textThatHelps2;
    help_text3.innerText = textThatHelps3;
}

setQuestion()
updateCircles(0);
