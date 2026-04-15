const API = "http://localhost:3000/api/bot";

async function add() {
  const name = document.getElementById("name").value;
  const response = document.getElementById("response").value;

  await fetch(API + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, response })
  });

  load();
}

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(c => {
    const li = document.createElement("li");
    li.innerText = `${c.name} → ${c.response}`;
    list.appendChild(li);
  });
}

function publish() {
  window.location.href = API + "/publish";
}

load();
