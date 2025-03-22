import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/movies")
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div>
            <h2>All Movies</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>{movie.title} ({movie.year}) - {movie.genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;