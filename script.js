const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;
let jokeNum = 0;

async function generateJoke() {
  // call the icanhaz API
  const res = await fetch(
    `https://icanhazdadjoke.com/search?limit=${limit}&page=${page}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );

  const data = await res.json();
  return data.results;
  // console.log(joke);
}

// Show jokes in DOM
async function showJokes() {
  const jokes = await generateJoke();

  //console.log(jokes);
  jokes.forEach(joke => {
    const jokeEl = document.createElement('div');
    jokeNum++;
    jokeEl.classList.add('post');
    jokeEl.innerHTML = `
    <div class="number">${jokeNum}</div>
    <div class="post-info">     
          <p class="post-body">
            ${joke.joke}
          </p>
        </div>
    `;

    postContainer.appendChild(jokeEl);
  });
}
// Show loader and fetch more jokes
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showJokes();
    }, 300);
  }, 1000);
}
// Show jokes
showJokes();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});
