const randomJokeBtn = document.querySelector(".random-joke");
const joke = document.querySelector(".joke");

const availableGradients = 9;

let previousBg;

function changeBg() {
  const bgNum = Math.ceil(Math.random() * availableGradients);
  document.body.classList.remove("bg-" + previousBg);
  document.body.classList.add("bg-" + bgNum);
  previousBg = bgNum;
}

randomJokeBtn.onclick = async () => {
  const res = await fetch("/api/random");
  const data = await res.json();
  joke.querySelector("h1").textContent = data.joke.body;
  joke.querySelector("p") && joke.removeChild(joke.querySelector("p"));
  joke.querySelector("img") && joke.removeChild(joke.querySelector("img"));

  if (data.joke.body) {
    joke.innerHTML += `
      <p>${data.joke.body}</p>
    `;
  }
  if (data.joke.image) {
    joke.innerHTML += `
      <img src="${data.joke.image}" alt="${data.joke.title}">
    `;
  }
  changeBg();
};
