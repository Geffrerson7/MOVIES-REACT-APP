import React, { useEffect, useState } from "react";
import "./MoviesList.css";
import { useParams } from "react-router-dom";
import Card from "../card/Card";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMoviesList(data.results));
  };
  console.log(moviesList);
  return (
    <div className="movie__list">
      <h2 className="list__title">
        {(type ? type.replace(/_/g, " ") : "POPULAR").toUpperCase()}
      </h2>
      <div className="list__cards">
        {moviesList.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
