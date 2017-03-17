//plans for trivia. 
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var timeLeft = 5;
var intervalID;
var questionNum = 0;
var correctAnswer = "";
var allQuestions = [];
var userAnswered = false;
var started = false;

class Question {
    constructor(question, answer1, answer2, answer3, answer4, correctAnswer){
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer
    }
}

var question1 = new Question("Napoleon suffered defeat at Waterloo in what year:", "1817", "1851", "1815", "1816", "c");
var question2 = new Question("Brazil was once a colony of which European country:", "spain", "france", "portugal", "england", "c");
var question3 = new Question("Each of a classic Rubik's Cube six faces is covered by how many stickers:", "8", "9", "7", "10", "b");
var question4 = new Question("What is the sleepiest animal in the world, sleeping around 22 hours each day:", "panada", "bear", "lion", "koala", "d");
var question5 = new Question("In what year was the first Apple computer released:", "1976", "1981", "1973", "1979", "a");
var question6 = new Question("In what year did Nintendo release its first game console in north america:", "1986", "1985", "1987", "1984", "b");
var question7 = new Question("How many times zones are in Canada:", "6", "5", "4", "7", "a");
var question8 = new Question("How many planets in our solar system have moons:", "5", "8", "6", "4", "c");
var question9 = new Question("Which patriot leader organized the boston tea party in 1773:", "Samual-Adams", "George-Washington", "Thomas-Jefferson", "Ben-Franklin", "a");

allQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9];

$(document).ready(function() {

$("#start").on("click", start);
$("#stop").on("click", stop);
$("body").on("click", ".answer", checkAnswer);
$("body").on("click", "#reset", reset);
});

function start()
{
    nextQuestion();
}

function restartInterval()
{
    intervalID = setInterval (decrement, 1000);
}

function decrement()
{
    $("#time-left").text("Time Left: " + timeLeft);
    if (timeLeft <= 0)
    {
        //console.log("less than 0");
        userAnswered = true;
        stop(); 
        wrong(2);
       
    }
    timeLeft--;
    
}

function wrong(typeWrong)
{
    stop();
    if (typeWrong === 1)
    {
        //console.log("incorrect answer");
        $("#question").text("Incorrect, the correct answer was: ")
        incorrectCount++;
        $("#incorrect").text("Incorrect:" + incorrectCount);
    }
    else if (typeWrong === 2)
    {
        //console.log("timed out");
        $("#question").text("You have ran out of time, the correct answer was: ")
        unansweredCount++;
        $("#unanswered").text("Unanswered: " + unansweredCount);
    }

    getNext();
}

function nextQuestion()
{
    $(".answer").animate({ opacity: 100 });
    userAnswered = false;
    if(questionNum < allQuestions.length)
    {
        timeLeft = 5;
        restartInterval();
        //console.log(allQuestions[questionNum]);
        var currentQuestion = allQuestions[questionNum];
        $("#question").text(currentQuestion.question);
        $("#answer1").text("a: " + currentQuestion.answer1);
        $("#answer2").text("b: " + currentQuestion.answer2);
        $("#answer3").text("c: " + currentQuestion.answer3);
        $("#answer4").text("d: " + currentQuestion.answer4);
        correctAnswer = currentQuestion.correctAnswer;
        questionNum++;
    }
    else
    {
        $("#question").text("You Completed the Quiz!");
        $("#answer1").hide();
        $("#answer2").hide();
        $("#answer3").hide();
        $("#answer4").hide();
        $("#reset").text("Click Here to Try Again");
    }
}

function checkAnswer()
{
    if (userAnswered === false)
    {
        userAnswered = true;
        if ($(this).attr("value") === correctAnswer)
        {
            correct();
        }
        else
        {
            wrong(1);
        }
    }
}

function correct()
{
    stop();
    $("#question").text("Correct!");
    correctCount++;
    $("#correct").text("Correct: " + correctCount);
    getNext();
}

function stop()
{
    clearInterval(intervalID);
}

function getNext()
{
    //$("#question").text("Preparing for next question");
    isWrong($("#answer1"));
    isWrong($("#answer2"));
    isWrong($("#answer3"));
    isWrong($("#answer4"));
    setTimeout(nextQuestion, 5000);

}

function isWrong(answer)
{
    if ($(answer).attr("value") != correctAnswer)
    {
        answer.animate({ opacity: 0 }, 4000);
    }
}

function reset()
{
    if (started === false)
    {
        started = true;
        start();
        $("#reset").text("");
    }
    else
    {
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        questionNum = 0;
        correctAnswer = "";
        userAnswered = false;
        $("#reset").text("");
        $("#incorrect").text("Incorrect: " + incorrectCount);
        $("#correct").text("Correct: " + correctCount);
        $("#unanswered").text("Unanswered: " + unansweredCount);
        $("#answer1").show();
        $("#answer2").show();
        $("#answer3").show();
        $("#answer4").show();
        start();
    }
}
