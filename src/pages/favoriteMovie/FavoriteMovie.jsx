import React, { useState, useEffect } from "react";
import axios from "axios";
import refreshToken from "../../services/RefreshToken";
import FavoriteCard from "../../components/favoriteCard/FavoriteCard";
import "./FavoriteMovie.css";

const FavoriteMovie = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const [movies, setMovies] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const BASE_URL = "http://127.0.0.1:8000/movie/";

  useEffect(() => {
    const today = new Date().toISOString().replace("T", " ").slice(0, 19);

    const fetchMovies = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.movies) {
        setMovies(cachedData.movies);
      } else {
        try {
          const response = await axios.get(BASE_URL, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
          const data = response.data;
          console.log(data);
          setCachedData({ movies: data.results });
          setCourses(data.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchMovies();
  }, [authTokens, cachedData, userData]);

  return (
    <>
      {movies.length > 0 ? (
        <>
          <div className="movie__list">
            <h2 className="list__title">FAVORITE</h2>
            <div className="list__cards">
              {movies.map((movie) => (
                <FavoriteCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-3xl mt-8 text-center text-white">
          No movies favorite
        </h1>
      )}
    </>
  );
};

export default FavoriteMovie;
