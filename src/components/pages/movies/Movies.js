import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import Genres from "../../genres/Genres";
import useGenres from "../../hooks/useGenres";
import CustomPagination from "../../pagination/CustomPagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreUrl = useGenres(selectedGenres);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreUrl}`
      );
      // console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };
    fetchMovies();
  }, [page, genreUrl]);

  return (
    <div className="movies">
      <span className="page__title">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {movies &&
          movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              poster={movie.backdrop_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Movies;
