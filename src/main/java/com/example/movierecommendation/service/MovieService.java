package com.example.movierecommendation.service;

import com.example.movierecommendation.model.Movie;
import com.example.movierecommendation.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final Random random = new Random();

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getRandomMovie() {
        List<Movie> movies = movieRepository.findAll();
        return movies.isEmpty() ? null : movies.get(random.nextInt(movies.size()));
    }

    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    public Movie addMovie(Movie movie) {
        // Prevent adding duplicate movies with the same title
        Optional<Movie> existingMovie = movieRepository.findAll()
                .stream()
                .filter(m -> m.getTitle().equalsIgnoreCase(movie.getTitle()))
                .findFirst();

        return existingMovie.orElseGet(() -> movieRepository.save(movie));
    }
}
