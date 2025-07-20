function loadHistory() {
  const matric = localStorage.getItem("matric");
  const ref = firebase.database().ref("results/" + matric);
  ref.once("value", snap => {
    let html = "<h3>Your Quiz History</h3><ul>";
    snap.forEach(entry => {
      const r = entry.val();
      html += `<li>${r.subject}: ${r.score} pts - ${new Date(r.time).toLocaleString()}</li>`;
    });
    html += "</ul>";
    document.getElementById("history").innerHTML = html;
  });
}