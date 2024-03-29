var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const home = document.querySelector(".leftnav");
home.addEventListener("click", () => {
  window.location.href = "../../";
});

const about = document.querySelector(".rightnav");
about.addEventListener("click", () => {
  window.location.href = "../about";
});

const basURL = "http://localhost:5000/api/getmovie";
const selectedGenres = localStorage.getItem("selected_genres");
async function sendmovienames() {
  fetch(basURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({genres: selectedGenres}),
  })
    .then((res) => res.json())
    .then((data) => {
      let movieDetails = JSON.parse(data);
      movieDetails.forEach((movie) => {
        console.log(movie);
        const swiperSlide = document.createElement("div");
        swiperSlide.className = "swiper-slide";
        const box = document.createElement("div");
        box.className = "box";
        const box1 = document.createElement("div");
        box1.className = "box1";
        const title = document.createElement("h2");
        title.className = "title";
        title.textContent = movie.name + `(${movie.release_date})`;
        const summaryTitle = document.createElement("h3");
        summaryTitle.className = "summarytitle";
        summaryTitle.textContent = "Summary";
        const summary = document.createElement("div");
        summary.className = "summary";
        summary.textContent = movie.overview;
        const ratingTitle = document.createElement("h3");
        ratingTitle.className = "ratingtitle";
        ratingTitle.textContent = "Ratings";
        const imdb = document.createElement("div");
        imdb.className = "IMDB";
        imdb.innerHTML = `<b>Popularity: </b>${movie.popularity}`;

        const metacritic = document.createElement("div");
        metacritic.className = "metacritic";
        metacritic.innerHTML = `<b>Average Vote: </b> ${movie.vote_average}`;
        const image = document.createElement("img");
        image.src = movie.banner;
        box1.appendChild(title);
        box1.appendChild(summaryTitle);
        box1.appendChild(summary);
        // box1.appendChild(ratingTitle);
        box1.appendChild(imdb);
        box1.appendChild(metacritic);
        box.appendChild(box1);
        box.appendChild(image);
        const loading = document.querySelector(".loadingbox");
        loading.style.display = "none";
        swiperSlide.appendChild(box);
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        swiperWrapper.appendChild(swiperSlide);
      });
    })
    .catch((err) => {
      // window.location.href = "../error";
      console.log(err);
    });
  // movienames.forEach(async (moviename) => {
  //   const params = new URLSearchParams();
  //   params.append("moviename", moviename);
  //   const url = `${basURL}?${params.toString()}`;
  //   try {
  //     const res = await fetch(url, {
  //       method: "GET",
  //     });
  //     const bannerlink = await res.text();
  //     const movieinfo = JSON.parse(bannerlink);
  //     console.log(movieinfo);
  //     const swiperSlide = document.createElement("div");
  //     swiperSlide.className = "swiper-slide";

  //     const box = document.createElement("div");
  //     box.className = "box";

  //     const box1 = document.createElement("div");
  //     box1.className = "box1";

  //     const title = document.createElement("h2");
  //     title.className = "title";
  //     title.textContent = movieinfo[0].title + `(${movieinfo[0].year})`;

  //     const summaryTitle = document.createElement("h3");
  //     summaryTitle.className = "summarytitle";
  //     summaryTitle.textContent = "Summary";

  //     const summary = document.createElement("span");
  //     summary.className = "summary";
  //     summary.textContent = movieinfo[0].summary;
  //     const ratingTitle = document.createElement("h3");
  //     ratingTitle.className = "ratingtitle";
  //     ratingTitle.textContent = "Ratings";

  //     const imdb = document.createElement("span");
  //     imdb.className = "IMDB";
  //     imdb.innerHTML = `<b>IMDB: </b>${movieinfo[0].imdbRating}`;

  //     const metacritic = document.createElement("span");
  //     metacritic.className = "metacritic";
  //     metacritic.innerHTML = `<b>Metacritic: </b> ${movieinfo[0].metacriticScore}`;

  //     const image = document.createElement("img");
  //     image.src = movieinfo[0].banner;
  //     image.alt = "";
  //     box1.appendChild(title);
  //     box1.appendChild(summaryTitle);
  //     box1.appendChild(summary);
  //     box1.appendChild(ratingTitle);
  //     box1.appendChild(imdb);
  //     box1.appendChild(metacritic);

  //     box.appendChild(box1);
  //     box.appendChild(image);
  //     const loading = document.querySelector(".loadingbox");
  //     loading.style.display = "none";
  //     swiperSlide.appendChild(box);
  //     const swiperWrapper = document.querySelector(".swiper-wrapper");
  //     swiperWrapper.appendChild(swiperSlide);
  //   } catch (error) {
  //     window.location.href = "../error";
  //   }
  // });
}

sendmovienames();
