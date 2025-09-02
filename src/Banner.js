import React, { useState, useEffect } from 'react'
import instance from './axios.js'
import requests from './Requests.js'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);
    const baseURL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(requests.fetchTrending);
            setMovie(
                response.data.results[
                    (Math.floor(Math.random() * response.data.results.length - 1) || 0)
                ]
            );
        }
        fetchData();
    }, []);


function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner