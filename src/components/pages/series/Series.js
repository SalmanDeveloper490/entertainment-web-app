import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import Genres from "../../genres/Genres";
import useGenres from "../../hooks/useGenres";
import CustomPaginationn from "../../pagination/CustomPagination";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreUrl = useGenres(selectedGenres);

  useEffect(() => {
    const fetchseries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreUrl}`
      );
      // console.log(data);
      setSeries(data.results);
      setTotalPages(data.total_pages);
    };
    fetchseries();
  }, [page, genreUrl]);

  return (
    <div className="series">
      <span className="page__title">Tv Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {series &&
          series.map((tv) => (
            <Card
              key={tv.id}
              id={tv.id}
              poster={tv.backdrop_path}
              title={tv.title || tv.name}
              date={tv.first_air_date || tv.release_date}
              media_type="tv"
              vote_average={tv.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPaginationn setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Series;
