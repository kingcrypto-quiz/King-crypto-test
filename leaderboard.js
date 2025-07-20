const ref = firebase.database().ref("results");
ref.once("value", snapshot => {
  const scores = {};
  snapshot.forEach(user => {
    let total = 0;
    user.forEach(r => total += r.val().score);
    scores[user.key] = total;
  });
  const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]).slice(0, 10);
  const list = document.getElementById("leaderboard-list");
  sorted.forEach(([user, score], i) => {
    const li = document.createElement("li");
    li.textContent = \`\${i+1}. \${user} - \${score} pts\`;
    list.appendChild(li);
  });
});