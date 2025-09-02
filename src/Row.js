import React, { useState, useEffect } from "react";
import instance from "./axios.js";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerURL, setTrailerURL] = useState("");
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await instance.get(fetchUrl);
      setMovies(response.data.results);
      setLoading(false);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    const movieName = movie?.name || movie?.title || movie?.original_name || "";
    console.log('Clicked movie:', movieName);
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(movieName)
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerURL(urlParams.get("v"));
          } else {
            console.error("No trailer URL found for:", movieName);
          }
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__poster--large"}`}
              src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))
        )}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
