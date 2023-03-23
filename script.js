const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const highScore = [];
const lead = document.getElementById("leaderboard");
const startbtn = document.getElementById("startbtn");
const startCard = document.getElementById("start-card");
const view_highscore = document.getElementById("high-score");
const time = document.getElementById("time");
const question_card = document.getElementById("question-card");
const quest = document.getElementById("question");
const opt1 = document.getElementById("option1");
const opt2 = document.getElementById("option2");
const opt3 = document.getElementById("option3");
const opt4 = document.getElementById("option4");
const ans = document.getElementById("answer");
const alldone = document.getElementById("all-done");
const finalscore = document.getElementById("final-score");
const player = document.getElementById("player");
const submit = document.getElementById("submit");
const goBack = document.getElementById("go-back");
const clearScore = document.getElementById("clear-score");
const list = document.getElementById("list");

let timerId;
let timeleft = 50;
let questionNum = 0;

goBack.addEventListener("click", () => {
  view_highscore.style.display = "none";
  startCard.style.display = "block";
});

clearScore.addEventListener("click", () => {
  for (let i = 0; i <= highScore.length; i++) {
    highScore.pop();
  }
  list.innerHTML = "";
});

lead.addEventListener("click", () => {
  startCard.style.display = "none";
  view_highscore.style.display = "block";
});

// It displays the final card all done after completing the quiz
function allDone() {
  question_card.style.display = "none";
  alldone.style.display = "block";
  finalscore.innerText = timeleft + 1;
}

// After submit button is clicked it will store the player name and score and reset the questionNum and timeleft variable / clear the time field and display the start card in the home
submit.addEventListener("click", () => {
  const name = player.value;
  const score = timeleft;
  highScore.push({ name, score });
  timeleft = 50;
  questionNum = 0;
  alldone.style.display = "none";
  startCard.style.display = "block";
  time.innerText = "";
  //This part put the element in the tag
  list.innerHTML = "";
  highScore.forEach((player) => {
    const item = document.createElement("li");
    item.textContent = `${player.name}: ${player.score}`;
    list.append(item);
  });
});

//It counts the timer and also triggers allDone function if timer runs out
function countDown() {
  if (timeleft < 0) {
    clearInterval(timerId);
    allDone();
  } else {
    time.innerText = timeleft;
    timeleft--;
  }
}

// It triggers the countdown function every 1 second
startbtn.addEventListener("click", () => {
  timerId = setInterval(countDown, 1000);
});

//It's a function to display questions
function showQuestion() {
  quest.innerText = questions[questionNum].questionText;
  opt1.innerText = questions[questionNum].options[0];
  opt2.innerText = questions[questionNum].options[1];
  opt3.innerText = questions[questionNum].options[2];
  opt4.innerText = questions[questionNum].options[3];
}

//This function Checks the Answer and also triggers the showQuestion function / also triggers allDone function
function checkAnswer(optionNum) {
  const answer = questions[questionNum].answer;
  const selectedAns = questions[questionNum].options[optionNum];
  if (answer === selectedAns) {
    ans.innerText = "Correct!";
    if (questionNum < 4) {
      questionNum++;
      showQuestion();
    } else {
      clearInterval(timerId);
      allDone();
    }
  } else {
    //if the answer is wrong and time is less than 10 seconds it will finish the quiz instead of deduction of 10 seconds to avoid negative highscore
    if (timeleft < 10) {
      clearInterval(timerId);
      allDone();
    }
    ans.innerText = "Incorrect!";
    timeleft -= 10;
  }
}

// It starts the quiz and show the question
function startQuiz() {
  startCard.style.display = "none";
  question_card.style.display = "block";

  showQuestion();
}
