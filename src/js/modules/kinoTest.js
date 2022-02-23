const kinoTest = () => {
  const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
  const API_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

  // const wrapperBlock = document.querySelector('.wrapper')
  const input = document.querySelector('.input');
  const sendButton = document.querySelector('.button');
  const cardBlock = document.querySelector('.bottom');
  const spinner = document.querySelector('.spinner')

  showStartPage(API_POPULAR)

  function showStartPage(popular) {
    getFilms(popular)
      .then(data => {
        console.log(data.films);
        data.films.forEach(({ genres, nameRu, posterUrlPreview, rating }) => {
          let currentRating = rating;
          if (rating == 'null') {
            currentRating = '4.5'
          } else if (rating.length > 3) {
            currentRating = `${rating[0]}.${rating[1]}`
          }
          createCard(posterUrlPreview, currentRating, nameRu, genres)

        })
      })
  }

  sendButton.addEventListener('click', (e) => {
    if (input.value.length < 1) return
    e.preventDefault();
    clearCard();
    searchFlims()
  })


  async function getFilms(url) {
    spinner.style.display = 'block'
    const res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        "X-API-KEY": API_KEY,
      },
    })

    if (res.status == 200) {
      spinner.style.display = ''
      return await res.json()
    }

  }

  function clearCard() {
    cardBlock.innerHTML = "";
  }

  function checkRating(num) {
    if (num < 6) {
      return 'red';
    } else if (num >= 6 && num <= 8) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  function createCard(img, rating, name, genres) {
    const card = document.createElement('div');
    card.classList.add('card');

    const genre = genres.map(item => ' ' + item.genre)

    card.innerHTML = `
      <img class="card__img" src=${img} alt="photo">
        <p class="card__rating ${checkRating(rating)}">
            ${rating}
          </p>
          <h2 class="card__title">
            ${name}
          </h2>
          <h4 class="card__genre">
            ${genre}
          </h4>
    `;

    cardBlock.append(card)

  }

  function searchFlims(url) {
    const searchUrl = `${API_SEARCH}${input.value}`

    getFilms(searchUrl)
      .then(data => {
        console.log(data.films);
        data.films.forEach(({ genres, nameRu, posterUrlPreview, rating }) => {
          let currentRating = rating;
          if (rating == 'null') {
            currentRating = '4.5'
          } else if (rating.length > 3) {
            currentRating = `${rating[0]}.${rating[1]}`
          }
          createCard(posterUrlPreview, currentRating, nameRu, genres)
        })

      })
  }

}
export default kinoTest;