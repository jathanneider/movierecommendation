package com.example.movierecommendation.controller;

import com.example.movierecommendation.model.Movie;
import com.example.movierecommendation.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/random")
    public ResponseEntity<Movie> getRandomMovie() {
        Movie movie = movieService.getRandomMovie();
        return (movie != null) ? ResponseEntity.ok(movie) : ResponseEntity.noContent().build();
    }

    @GetMapping("/genre/{genre}")
    public List<Movie> getMoviesByGenre(@PathVariable String genre) {
        return movieService.getMoviesByGenre(genre);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }
}