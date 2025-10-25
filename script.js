// ---------------------- QUESTIONS ----------------------
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: false },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false }
    ]
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "dim", correct: false },
      { text: "int", correct: false },
      { text: "let", correct: true }
    ]
  }
];

// ---------------------- ELEMENT REFERENCES ----------------------
const homeContainer = document.getElementById("home");
const quizContainer = document.getElementById("quiz");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_LIMIT = 10; // seconds

// ---------------------- HOME SCREEN ----------------------
startButton.addEventListener("click", () => {
  homeContainer.style.display = "none";
  quizContainer.style.display = "block";
  startQuiz();
});

// ---------------------- QUIZ FUNCTIONS ----------------------
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  scoreContainer.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer));
    answerButtons.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  progressBar.style.width = "100%";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, answer) {
  clearInterval(timer);
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function startTimer() {
  let timeLeft = TIME_LIMIT;
  progressBar.style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;
    const progressPercent = (timeLeft / TIME_LIMIT) * 100;
    progressBar.style.width = progressPercent + "%";

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (questions[currentQuestionIndex].answers.find(a => a.correct).text === btn.textContent) {
      btn.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.textContent = "🎉 Quiz Completed!";
  scoreContainer.innerHTML = `Your Score: <b>${score} / ${questions.length}</b>`;
  nextButton.textContent = "Back to Home";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", goHome, { once: true });
}

function goHome() {
  quizContainer.style.display = "none";
  homeContainer.style.display = "block";
}