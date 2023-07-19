import React, { useState, useEffect } from "react"; //importacion de los hookers
import axios from "axios";

function App() {

  //constantes y variables.
  const API_URL = 'https://api.themoviedb.org/3'; 
  const API_KEY = '621dd4ce3cbd8016e5b77c0f3bc44edc';
  const URL_image = 'https://image.tmdb.org/t/p/original';

  //constantes de estados useState.
  
  const [movies, setMovies] = useState([]); //este hook de movies (plural) recibe y almacena en un array todas las peliculas a travez de la peticion fetch
  const [searchKey, setSearchKey] = useState(''); 
  const [movie, setMovie] = useState({title: "Loading Movies"});
  const [showDescription, setShowDescription] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchMovies = async (searchKey) => {
    const type =  "discover";
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  // Petición de información de la película seleccionada
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "description"
      }
    });

    setMovie(data);
  };

  const selectMovie = (movie) => {
    if (selectedMovieId === movie.id) {
      setSelectedMovieId(null); // Desmarca la película seleccionada si se hace clic nuevamente
    } else {
      setSelectedMovieId(movie.id); // Establece el ID de la película seleccionada
      fetchMovie(movie.id);
      setMovie(movie);
      setShowDescription(true); // Muestra la descripción para la nueva película seleccionada
    }
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
              <img src={`${URL_image}${movie.poster_path}`} alt="" height={600} width="100%" onClick={() => selectMovie(movie)} />
              <h4 className="text-center">{movie.title}</h4>
              {selectedMovieId === movie.id && (
                <div>
                  {movie.overview}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
