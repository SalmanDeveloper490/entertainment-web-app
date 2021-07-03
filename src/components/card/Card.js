import React, { useEffect, useState } from "react";
import "./Card.css";
import { img_300, unavailable } from "../config/Config";
import Badge from "@material-ui/core/Badge";
import ContentModal from "../Modal/ContentModal";
import Skeleton from "@material-ui/lab/Skeleton";

const Card = ({ id, poster, title, date, media_type, vote_average }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  return (
    <>
      {loading && (
        <Skeleton
          variant="rect"
          width="100%"
          height={500}
          style={{
            backgroundColor: "#202020",
            borderRadius: "10px",
          }}
        />
      )}

      {!loading && (
        <ContentModal media_type={media_type} id={id}>
          <Badge
            badgeContent={vote_average}
            color={vote_average > 6 ? "primary" : "secondary"}
          />
          <img
            className="poster"
            src={poster ? `${img_300}${poster}` : unavailable}
            alt={title}
          />
          <div className="movie__details">
            <b className="title">{title}</b>
            <span className="subTitle">
              {media_type === "tv" ? "TV Series" : "Movie"}
              <span className="subTitle">{date}</span>
            </span>
          </div>
        </ContentModal>
      )}
    </>
  );
};

export default Card;
