const questions = [
    {
         question: "Which animal is the largest in the world?",
         answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    }, 
    {
         question: "Which country is the smallest in the world?",
         answers: [
            {text: "Vatican City", correct: true},
            {text: "Blue whale", correct: false},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]  
    }, 
    {
         question: "When Sierra Leone gain independent?",
         answers: [
            {text: "April, 27 1994", correct: false},
            {text: "April, 27 1969", correct: true},
            {text: "July, 27 1969", correct: false},
            {text: "April, 30 1974", correct: false},
        ]
    },
    {
         question: "How many world cup trophies Brazil has won?",
         answers: [
            {text: "5", correct: true},
            {text: "4", correct: false},
            {text: "6", correct: false},
            {text: "3", correct: false},
        ]
    },
    {
         question: "Which is the richest european country?",
         answers: [
            {text: "Belgium", correct: false},
            {text: "France", correct: false},
            {text: "England", correct: false},
            {text: "Luxembourg", correct: true},
        ]
    },
    {
         question: "Which country has the tallest building in the world?",
         answers: [
            {text: "America", correct: false},
            {text: "Japan", correct: false},
            {text: "UAE", correct: true},
            {text: "Malaysia", correct: false},
        ]
    }, 
    {
         question: "Which is the beautiful city in the world?",
         answers: [
            {text: "Florence, Italy", correct: true},
            {text: "Cape Town, South Africa", correct: false},
            {text: "St. Petersburg, Russia", correct: false},
            {text: "Kyoto, Japan", correct: false},
        ]  
    }, 
    {
         question: "Country with the highest literacy rate?",
         answers: [
            {text: "Belgium", correct: false},
            {text: "England", correct: false},
            {text: "Canada", correct: true},
            {text: "Australia", correct: false},
        ]
    },
    {
         question: "The most valuable currency in the world?",
         answers: [
            {text: "Kuwaiti Dinar", correct: true},
            {text: "US Dollar", correct: false},
            {text: "Euro", correct: false},
            {text: "Pounds", correct: false},
        ]
    },
    {
         question: "Which company is the largest in the world?",
         answers: [
            {text: "Tesla", correct: false},
            {text: "Facebook", correct: false},
            {text: "Microsoft", correct: false},
            {text: "Apple", correct: true},
        ]
    },
    

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none"
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length){
    showQuestion();
  }else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});


startQuiz();