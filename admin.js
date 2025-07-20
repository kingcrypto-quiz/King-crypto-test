function addQuestion() {
  const q = document.getElementById('new-question').value;
  const optA = document.getElementById('optA').value;
  const optB = document.getElementById('optB').value;
  const optC = document.getElementById('optC').value;
  const optD = document.getElementById('optD').value;
  const correct = document.getElementById('correct').value;
  const questionData = {
    q: q,
    options: ["A. " + optA, "B. " + optB, "C. " + optC, "D. " + optD],
    correct: correct
  };
  firebase.database().ref("questions").push(questionData);
  alert("Question added!");
}