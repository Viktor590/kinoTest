const kinoTest = () => {
  const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
  const API_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"


  const sendButton = document.querySelector('.button');
  const cardBlock = document.querySelector('.bottom');




  sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    // const input = document.querySelector('.input').value;
    clearCard();
    getFilms(API_POPULAR)
      .then(data => {
        console.log(data.films);
        data.films.forEach(({ genres, nameRu, posterUrlPreview, rating }) => {
          // console.log(genres, nameRu, rosterUrlPreview, rating);
          createCard(posterUrlPreview, rating, nameRu, genres)
        })
      })
  })

  async function getFilms(url) {
    const res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        "X-API-KEY": API_KEY,
      },
    })
    return await res.json()
  }

  function clearCard() {
    cardBlock.innerHTML = "";
  }

  function createCard(img, rating, name, genres) {
    const card = document.createElement('div');
    card.classList.add('card');

    const genre = genres.map(item => item.genre)

    card.innerHTML = `
      <img class="card__img" src=${img} alt="photo">
          <p class="card__rating">
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

}
export default kinoTest;