import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import YouTube from 'react-youtube';

function App() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '621dd4ce3cbd8016e5b77c0f3bc44edc';
  const image_path = 'https://image.tmdb.org/t/p/original';
  const URL_image = 'https://image.tmdb.org/t/p/original'

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({title: "Loading Movies"});
  const [playing, setPlaying] = useState(false)

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  };

  useEffect(() => {
    fetchMovies(searchKey);
  }, [searchKey]);

  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img src={`${URL_image}${movie.poster_path}`} alt="" height={600} width='100%'/>
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
