var timeEl = document.getElementById("time");
var timeCounter = document.getElementById("timeCounter");
var endingEl = document.getElementById("ending-section");
var containerEl = document.querySelector(".container-size");

var quizContainerEl = document.getElementById("quiz-container");
console.log(quizContainerEl);
var questionEle = document.querySelector("p");
var option1Ele = document.getElementById("option1");
var option2Ele = document.getElementById("option2");
var option3Ele = document.getElementById("option3");
var option4Ele = document.getElementById("option4");
var btns = document.getElementById("allBtn");

var endingSection = document.getElementById("ending-section");
var submitBtn = document.getElementById("submit");
var scoreBoard = document.getElementById("score-board");
var scoreBoardWrapper = document.getElementById("score-board-wrapper");
var input = document.getElementById("Input1");

var goBackButton = document.getElementById("go-back");
var clearButton = document.getElementById("clear");

var score = 0;
var secondLeft = 5;
var coountOfquestions = 0;
var countDownFunction;
var millisecondsFunction;
var milliseconds = 100;

var correctOrWrong = document.getElementById("correctOrWrong");
//this ref a empty obj in constructors
class Question {
    constructor(text, ans1, ans2, ans3, ans4, correct) {
        this.text = text;
        this.ans1 = ans1;
        this.ans2 = ans2;
        this.ans3 = ans3;
        this.ans4 = ans4;
        this.correct = correct;
    }
}

var question1 = new Question("2 + 2 ?", "4", "5", "6", "7", "4");
var question2 = new Question("100* 2 ?", "8", "200", "10", "15", "200");
var question3 = new Question("2 * 9 ?", "15", "18", "122", "20", "18");
var question4 = new Question("9 * 9 ?", "81", "64", "72", "15", "81");

var currentQuestion;

var questionArray = [question1, question2, question3, question4];


function randomQuestion() {
    console.log("questionArray before pop: " + questionArray);
    let index = Math.floor(Math.random() * questionArray.length);
    currentQuestion = questionArray[index];
    console.log("current question"+questionArray[index].text);
    questionEle.textContent = questionArray[index].text;
    option1Ele.textContent = questionArray[index].ans1;
    option2Ele.textContent = questionArray[index].ans2;
    option3Ele.textContent = questionArray[index].ans3;
    option4Ele.textContent = questionArray[index].ans4;
    
    var currentIndex = questionArray.indexOf(questionArray[index]);
    questionArray.splice(currentIndex, 1); 

    console.log("questionArray after pop: " + questionArray);
}

function countDown() {
    timeEl.textContent = "Quiz starting " + this.secondLeft;

    if (secondLeft === 0) {
        containerEl.setAttribute("style", "display:block");
        timeEl.style.display = "none";
        clearInterval(countDownFunction);
        randomQuestion();
        millisecondsFunction = setInterval(milescondCounter, 1000);
    }
    this.secondLeft--;
}

//go to next question in random order
function nextQuestion(event) {
    //click on button
    correctOrWrong.textContent = " ";
    if (event.target.nodeName === "BUTTON") {
        console.log("nextQuestion()");
        //when array is empty, display ending section
        if (questionArray.length === 0) {
            endingEl.style.display = "block";
            containerEl.setAttribute("style", "display:none");
            timeCounter.style.display = "none";
        } else {
            if (event.target.textContent === currentQuestion.correct) {
                correctOrWrong.textContent = "last question was Correct";
                score++; 
                randomQuestion();
                
            } else if (event.target.textContent !== currentQuestion.correct) {
                milliseconds = milliseconds - 50;
                timeCounter.textContent = milliseconds;
                correctOrWrong.textContent = "last question was Wrong";
                if (milliseconds <= 0) {
                    milliseconds = 0;
                    timeCounter.textContent = milliseconds;
                    clearInterval(millisecondsFunction);
                    quizContainerEl.style.display = "none";
                    endingEl.style.display = "block";
                    timeCounter.style.display = "none";
                } else {
                    randomQuestion();
                }
            }

        }
    }
}

function highlighter(){

}

function displayScoreBoard() {
    console.log("displayScoreBoard()");
    endingSection.style.display = "none";

    let playerName = input.value;
    let trEle = document.createElement("tr");
    let thEle = document.createElement("th");
    let tdTimeEle = document.createElement("td");
    let tdScoreEle = document.createElement("td");

    //add plyer name
    thEle.setAttribute("scope", "row");
    let node = document.createTextNode(playerName);
    thEle.appendChild(node);
    trEle.appendChild(thEle);

    //add score
    node = document.createTextNode(score);
    tdScoreEle.appendChild(node);
    trEle.appendChild(tdScoreEle);

    //add milescond
    node = document.createTextNode(milliseconds);
    tdTimeEle.appendChild(node);
    trEle.appendChild(tdTimeEle);

    //add tr to scoreBoard
    scoreBoard.appendChild(trEle);
    //display scoreBoard
    scoreBoardWrapper.style.display = "block";
}

function goback() {
    location.reload();
}

function clear() {
    var new_tbody = document.createElement('tbody');
    scoreBoard.parentNode.replaceChild(new_tbody, scoreBoard);
}

function milescondCounter() {
    timeCounter.textContent = milliseconds;
    milliseconds--;
    if (milliseconds === 0) {
        clearInterval(millisecondsFunction);
        quizContainerEl.style.display = "none";
        endingEl.style.display = "block";
        timeCounter.style.display = "none";
    }
}

setInterval(countDown, 1000);

btns.addEventListener("click", nextQuestion);

submitBtn.addEventListener("click", displayScoreBoard);
goBackButton.addEventListener("click", goback);
clearButton.addEventListener("click", clear);
