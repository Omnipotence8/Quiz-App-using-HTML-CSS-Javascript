const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const progressBarFull = document.querySelector('#progress-bar-full');
const scoreText = document.querySelector('#score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the Capital of the state of Arizona?',
        choice1: 'Annapolis',
        choice2: 'Phoenix',
        choice3: 'Dover',
        choice4: 'Topeka',
        answer: 2,
    },
    {
        question: 'What is the Capital of the state of Maryland?',
        choice1: 'Annapolis',
        choice2: 'Phoenix',
        choice3: 'Dover',
        choice4: 'Topeka',
        answer: 1,
    },
    {
        question: 'What is the Capital of the state of Arkansas?',
        choice1: 'Littel Rock',
        choice2: 'Phoenix',
        choice3: 'Atlanta',
        choice4: 'Boise',
        answer: 1,
    },
    {
        question: 'What is the Capital of the state of Montana?',
        choice1: 'Jackson',
        choice2: 'Santa Fe',
        choice3: 'Dover',
        choice4: 'Helena',
        answer: 4,
    },
    {
        question: 'What is the Capital of the state of New Mexiko?',
        choice1: 'Jackson',
        choice2: 'Santa Fe',
        choice3: 'Dover',
        choice4: 'Helena',
        answer: 2,
    },
];

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page
        return window.location.assign('end.html');
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame()