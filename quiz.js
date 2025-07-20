let questions = [
  { q: "What is 2 + 2?", options: ["A. 3", "B. 4", "C. 5", "D. 6"], correct: "B" },
  { q: "Physics: Unit of Force?", options: ["A. Newton", "B. Pascal", "C. Watt", "D. Joule"], correct: "A" }
];
let current = 0;
let score = 0;
let userAnswers = {};
let timer = 1200;

function renderQuestion() {
  const q = questions[current];
  document.getElementById('question-box').innerHTML = \`
    <h3>Q\${current + 1}: \${q.q}</h3>
    <ul>
      \${q.options.map((opt, i) => \`<li><input type="radio" name="opt" value="\${opt[0]}" /> \${opt}</li>\`).join("")}
    </ul>
    <button onclick="nextQuestion()">Next</button>
  \`;
}
function nextQuestion() {
  const selected = document.querySelector("input[name='opt']:checked");
  if (!selected) return alert("Choose an option!");
  userAnswers[current] = selected.value;
  if (selected.value === questions[current].correct) score++;
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    submitQuiz();
  }
}
function submitQuiz() {
  clearInterval(timerInterval);
  let result = \`You scored \${score} out of \${questions.length}\`;
  alert(result);
  saveResult(score);
}
function saveResult(score) {
  const matric = localStorage.getItem("matric");
  const ref = firebase.database().ref("results/" + matric);
  ref.push({ subject: "Sample", score: score, time: new Date().toISOString() });
}
function startTimer() {
  timerInterval = setInterval(() => {
    if (timer <= 0) {
      submitQuiz();
      clearInterval(timerInterval);
    }
    document.getElementById("timer").textContent = "Time Left: " + Math.floor(timer/60) + ":" + (timer%60).toString().padStart(2, "0");
    timer--;
  }, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("subject-title").textContent = new URLSearchParams(window.location.search).get("subject");
  renderQuestion();
  startTimer();
});