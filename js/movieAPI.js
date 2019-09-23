$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    e.preventDefault();

    let searchText = $("#searchText").val();

    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" +
        searchText
    )
    .then(function(response) {
      let movies = response.data.results;
      let output = "";
      let rates = [];
      let stars = "";
      const emptyStar = "&#9734";
      const star = "&#9733;";

      for (i = 0; i < $(movies).length; i++) {
        rates[i] = movies[i].vote_average;

        if (rates[i] === 0) {
          stars = emptyStar;
        } else if (rates[i] <= 2) {
          stars = `${star}`;
        } else if (rates[i] <= 4) {
          stars = `${star}${emptyStar}`;
        } else if (rates[i] <= 6) {
          stars = `${star}${star}`;
        } else if (rates[i] <= 7) {
          stars = `${star}${star}${star}`;
        } else if (rates[i] < 8.5) {
          stars = `${star}${star}${star}${emptyStar}`;
        } else {
          stars = `${star}${star}${star}${star}${star}`;
        }

        output += `
            <div class="col-md-3 col-md-3-modified">
              <div class="well text-center">
                <img onclick="movieSelected('${movies[i].id}')" src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" onerror="this.src='images/No_Image.jpeg';">
                <h6>${movies[i].title}<br><span class="rate-modified">${stars}</span></h6>
                <a onclick="movieSelected('${movies[i].id}')" class="detail-btn" href="#">Movie Details</a>
              </div>
            </div>
          `;
      }

      $("#movies").html(output);
    })
    .catch(() => {
      output = `
          <br><br><br><br><br><div class="error">
            <h3>:(<br><br>There is no information in the database.</h3>
          </div>
        `;

      $("#movies").html(output);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movieInfo.html";

  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=98325a9d3ed3ec225e41ccc4d360c817"
    )
    .then(function(response) {
      let movie = response.data;
      let output = `
          <br><br><br><br><div class="row row-modified">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror="this.src='images/No_Image.jpeg';">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2><br>
              <ul class="movie-detail">
                <li><span class="movie-detail-list">Genre:</span> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                <li><span class="movie-detail-list">Released:</span> ${movie.release_date}</li>
                <li><span class="movie-detail-list">Rated:</span> ${movie.vote_average}<span class="rate"> / 10<span></li>
                <li><span class="movie-detail-list">Runtime:</span> ${movie.runtime} min.</li>
                <li><span class="movie-detail-list">Production Companies:</span> ${movie.production_companies[0].name}</li>
              </ul>
            </div>
          </div><br>
          <div class="row movie-detail-plot">
            <div class="plot">
              <p>${movie.overview}</p>
              <a href="movie.html" class="detail-btn back-to-search">Go Back To Search</a>
            </div>
          </div>
        `;

      $("#movie").html(output);
    })
    .catch(() => {
      let output = `
          <br><br><br><br><br><div class="error">
            <h3>:(<br><br>There is no information in the database.</h3>
          </div>
        `;

      $("#movie").html(output);
    });
}
