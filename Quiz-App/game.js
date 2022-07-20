const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const progressBarFull = document.getElementById('progressBarFull');



let currentQuestion = {};
let acceptingAnswers = false;

let score = 0;
let questionCounter = 0;
let availabeQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();

    }).then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {

            const formattedQuestion = {
                question: loadedQuestion.question

            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(answerChoices - 1, 0, loadedQuestion.correct_answers);

            answerChoices.forEach((choice, index) => {

                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;

        })
        startGame();
    }).catch(err => {

        console.error(err);
    });
//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {

    questionCounter = 0;
    score = 0;
    availabeQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}


getNewQuestion = () => {
    if (availabeQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availabeQuestions.length);
    currentQuestion = availabeQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];


        choice.innerText = currentQuestion["choice" + number];

    });
    availabeQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;


};

choices.forEach(choice => {

    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const SelectedChoice = e.target;
        const SelectedAnswer = SelectedChoice.dataset['number'];


        const classToApply = SelectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }


        SelectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            SelectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();


        }, 1000);

    });
});
incrementScore = num => {

    score += num;
    scoreText.innerText = score;
};
