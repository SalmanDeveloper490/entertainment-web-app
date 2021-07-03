import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import Card from "../../card/Card";
import CustomPagination from "../../pagination/CustomPagination";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const Trending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      // console.log(data);
      setTrending(data.results);
      setTotalPages(data.total_pages);
    };
    Trending();
  }, [page]);

  return (
    <>
      <span className="page__title">Trending</span>
      <div className="trending">
        {trending &&
          trending.map((trending) => (
            <Card
              key={trending.id}
              id={trending.id}
              poster={trending.poster_path}
              title={trending.title || trending.name}
              date={trending.first_air_date || trending.release_date}
              media_type={trending.media_type}
              vote_average={trending.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
};

export default Trending;
