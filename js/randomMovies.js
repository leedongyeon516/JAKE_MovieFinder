let result = "";
let characters = "ABCDEFGHIJLMNOPQRSTUVWXZ1234567";
let charactersLength = characters.length;

result += characters.charAt(Math.floor(Math.random() * charactersLength));

function getTenRandomMovies() {
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" +
        result
    )
    .then(function(response) {
      let movies = response.data.results;
      let tenMoviesByRate = [];
      let tenPosters = [];
      let posterClasses = [];
      const classNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      for (i = 0; i < movies.length; i++) {
        tenMoviesByRate = movies.sort(
          (a, b) => b.vote_average - a.vote_average
        );
      }

      for (i = 0; i < 10; i++) {
        tenPosters[i] = tenMoviesByRate[i].poster_path;
        posterClasses[i] = `.poster-${classNumbers[i]}`;

        if (tenPosters[i] === null) {
          document.querySelector(
            `${posterClasses[i]}`
          ).style.background = `url('images/No_Image.jpeg') no-repeat center center/cover`;
        } else {
          document.querySelector(
            `${posterClasses[i]}`
          ).style.background = `url('https://image.tmdb.org/t/p/w500${tenPosters[i]}') no-repeat center center/cover`;

          /*
          document
            .querySelector(`${posterClasses[i]}`)
            .addEventListener("click", movieSelected(`${movies[i].id}`));*/
        }
      }
    });
}

getTenRandomMovies();
