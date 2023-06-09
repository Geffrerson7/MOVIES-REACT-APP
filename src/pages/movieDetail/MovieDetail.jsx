import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import refreshToken from "../../services/RefreshToken";
import Swal from "sweetalert2";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);
  const navigate = useNavigate();
  const MOVIE_BASE_URL = "http://127.0.0.1:8000/movie/";

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  console.log(currentMovieDetail)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.expirated_date === today) {
      const newAccessToken = await refreshToken(authTokens.refresh);
      setAccessToken(newAccessToken);
    }
    
    try {
      const response = await axios.post(
        MOVIE_BASE_URL,
        {
            adult: currentMovieDetail.adult,
            backdrop_path: currentMovieDetail.backdrop_path,
            genres: currentMovieDetail.genres,
            homepage: currentMovieDetail.homepage,
            imdb_id: currentMovieDetail.imdb_id,
            movie_id: currentMovieDetail.id,
            original_language: currentMovieDetail.original_language,
            original_title: currentMovieDetail.original_title,
            overview: currentMovieDetail.overview,
            popularity: currentMovieDetail.popularity,
            poster_path: currentMovieDetail.poster_path,
            production_companies:currentMovieDetail.production_companies,
            runtime:currentMovieDetail.runtime,
            release_date: currentMovieDetail.release_date,
            tagline: currentMovieDetail.tagline,
            title: currentMovieDetail.title,
            video: currentMovieDetail.video,
            vote_average: currentMovieDetail.vote_average,
            vote_count: currentMovieDetail.vote_count,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire(
          "Saved!",
          "The movie was saved successfully.",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
        console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred!",
      });
    }
  };

  return (
    <>
      <div className="movie">
        <div className="movie__intro">
          <img
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${
              currentMovieDetail ? currentMovieDetail.backdrop_path : ""
            }`}
          />
        </div>
        <div className="movie__detail">
          <div className="movie__detailLeft">
            <div className="movie__posterBox">
              <img
                className="movie__poster"
                src={`https://image.tmdb.org/t/p/original${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
              />
            </div>
          </div>
          <div className="movie__detailRight">
            <div className="movie__detailRightTop">
              <div className="movie__name">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="movie__tagline">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="movie__rating">
                {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                <i className="fas fa-star" />
                <span className="movie__voteCount">
                  {currentMovieDetail
                    ? "(" + currentMovieDetail.vote_count + ") votes"
                    : ""}
                </span>
              </div>
              <div className="movie__runtime">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
              <div className="movie__releaseDate">
                {currentMovieDetail
                  ? "Release date: " + currentMovieDetail.release_date
                  : ""}
              </div>
              <div className="movie__genres">
                {currentMovieDetail && currentMovieDetail.genres
                  ? currentMovieDetail.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="movie__genre"
                        id={genre.id}
                      >
                        {genre.name}
                      </span>
                    ))
                  : ""}
              </div>
            </div>
            <div className="movie__detailRightBottom">
              <div className="synopsisText">Synopsis</div>
              <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>
          </div>
        </div>
        <div className="movie__links">
          <div className="movie__heading">Useful Links</div>
          {currentMovieDetail && currentMovieDetail.homepage && (
            <a
              href={currentMovieDetail.homepage}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <p>
                <span className="movie__homeButton movie__Button">
                  Homepage <i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          )}
          {currentMovieDetail && currentMovieDetail.imdb_id && (
            <a
              href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <p>
                <span className="movie__imdbButton movie__Button">
                  IMDb<i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          )}
        </div>
        <div className="mb-16">
            <form onSubmit={handleSubmit}>
                <button className="hover:bg-cyan-600 bg-cyan-300 text-black rounded-lg px-4 py-2" type="submit">Save</button>
            </form>
        </div>
        <div className="movie__heading">Production companies</div>
        <div className="movie__production">
          {currentMovieDetail &&
            currentMovieDetail.production_companies &&
            currentMovieDetail.production_companies.map((company) => (
              <div key={company.name}>
                {company.logo_path ? (
                  <span className="productionCompanyImage">
                    <img
                      className="movie__productionCompany"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                    />
                    <span>{company.name}</span>
                  </span>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
