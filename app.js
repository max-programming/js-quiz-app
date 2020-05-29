// API LINK: https://opentdb.com/api_config.php
const questionEl = document.querySelector(".question h2");
const answerContainer = document.querySelector(".answer-container");
const answerButtons = document.querySelectorAll(".answer-btn");

const nextBtn = document.querySelector(".next");
let answers, shuffledAnswers, data;
let isCorrect = false;
let answer = "2";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function highlightAnswers(correctAnswer) {
  console.log("hi");
}

async function getQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=1&type=multiple&difficulty=easy&category=9"
  );
  data = await res.json();
  // Display the question
  questionEl.innerHTML = data.results[0].question;
  answers = [
    ...data.results[0].incorrect_answers,
    data.results[0].correct_answer,
  ];
  shuffledAnswers = shuffle([...answers]);
  // debugger;
  // console.log(shuffledAnswers);
  // console.log(answers);
  shuffledAnswers.forEach((answer, index) => {
    answerButtons[index].innerText = answer;
  });
}

getQuestions().then(() => displayData());
// displayData();
function displayData() {
  console.log(answerButtons);
  answerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.innerText == data.results[0].correct_answer) {
        console.log("correct");
        e.target.classList.remove("btn-outline-dark");
        e.target.classList.add("btn-success");
        // nextBtn.classList.remove("d-none");
        setTimeout(() => {
          getQuestions();
          answerButtons.forEach((btn) => {
            if (btn.classList.contains("btn-danger")) {
              btn.classList.add("btn-outline-dark");
              btn.classList.remove("btn-danger");
            } else if (btn.classList.contains("btn-success")) {
              btn.classList.remove("btn-success");
              btn.classList.add("btn-outline-dark");
            }
          });
        }, 500);
      } else {
        e.target.classList.remove("btn-outline-dark");
        e.target.classList.add("btn-danger");
        console.log("wrong");

        setTimeout(() => {
          getQuestions();
          answerButtons.forEach((btn) => {
            if (btn.classList.contains("btn-danger")) {
              btn.classList.add("btn-outline-dark");
              btn.classList.remove("btn-danger");
            } else if (btn.classList.contains("btn-success")) {
              btn.classList.remove("btn-success");
              btn.classList.add("btn-outline-dark");
            }
          });
        }, 500);
      }
    });
  });
  // setTimeout(() => getQuestions(), 500);
}
