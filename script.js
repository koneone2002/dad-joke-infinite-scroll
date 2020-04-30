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
// Filter jokes by input
function filterJokes(e) {
  console.log(e.target.value);

  const term = e.target.value.toUpperCase();
  const jokes = document.querySelectorAll('.post');

  jokes.forEach(joke => {
    const body = joke.querySelector('.post-body').innerText.toUpperCase();

    if (body.indexOf(term) > -1) {
      joke.style.display = 'flex';
    } else {
      joke.style.display = 'none';
    }
  });
}
// Show jokes
showJokes();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

filter.addEventListener('input', filterJokes);
