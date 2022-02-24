const kinoTest = () => {
  const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
  const API_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
  const API_SEARCH_ID = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

  const wrapper = document.querySelector('.wrapper');
  const input = document.querySelector('.input');
  const sendButton = document.querySelector('.button');
  const cardBlock = document.querySelector('.bottom');
  const spinner = document.querySelector('.spinner')

  const showBlock = document.createElement('div');
  showBlock.classList.add('show-wrapper');

  showStartPage(API_POPULAR)
  getItemsImages()

  function showStartPage(popular) {
    getFilms(popular)
      .then(data => {
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

  function searchFlims() {
    const searchUrl = `${API_SEARCH}${input.value}`

    getFilms(searchUrl)
      .then(data => {
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

  function getItemsImages() {
    cardBlock.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card__img')) return
      const idImg = +e.target.src.replace(/[\D]+/g, '');
      const searchId = `${API_SEARCH_ID}${idImg}`;

      getFilms(searchId)
        .then(data => {
          const { nameRu, posterUrlPreview, year, description, countries } = data;
          showModal(nameRu, posterUrlPreview, year, description, countries)
        })

    })
  }

  function showModal(title, poster, year, dscr, country) {
    showBlock.innerHTML = `
      <div class="show">
        <img class="show__top-poster" src=${poster}
          alt="poster">
        <div class="show__content">
          <img class="show__content-close" src="img/close.svg" alt="close">
          <h2 class="show__content-title">${title}</h2>

          <p class="show__content-dscr">Страна: ${country.map(el => el.country)}</p>
          <p class="show__content-dscr">Год: ${year}</p>
          <p class="show__content-dscr description">${dscr}</p>
        </div>
      </div>
    `;

    wrapper.append(showBlock);
    addContentStyle();
    const closeBtn = document.querySelector('.show__content-close');
    closeBtn.addEventListener('click', () => {
      showBlock.style.display = '';
      document.body.style.cssText = `
      overflow: '';
      margin-right: 0
    `;
    })

  }

  function addContentStyle() {
    let scrollSize = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.cssText = `
      overflow: hidden;
      margin-right: ${scrollSize}px
    `
    const showContent = document.querySelector('.show')

    showBlock.style.display = 'block'
    let showPositionLeft = Math.round(showBlock.clientWidth / 2 - showContent.offsetWidth / 2);

    let showPositionTop = Math.round(showBlock.clientHeight / 2 - showContent.offsetHeight / 2);
    showContent.style.cssText = `
      top: ${showPositionTop}px;
      left: ${showPositionLeft}px;
    `;
  }
}
export default kinoTest;